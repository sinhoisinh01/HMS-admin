<?php
namespace App\Http\Controllers;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Routing\Controller;
class SupplierController extends Controller
{
    function getOne($supplierId){
        return response()->json(Supplier::where('user_id', 1)->where('id',$supplierId)->first());
    }
    function getAll(Request $request)
    {
        $index = $request->input('index'); 
        $limit = $request->input('limit');
        return response()->json(Supplier::where('user_id', 1)->take($limit)->skip($index)->get());
    }
    function getPage($numberOfRecord){
    	$suppliers = Supplier::where('user_id',1)->get();
        $numberOfRecord = intval($numberOfRecord);
    	$pages = intval(sizeof($suppliers) / $numberOfRecord) + 1;
    	return response()->json(["pages" => $pages]);
    }

	function add(Request $request)
	{
		$supplier = $request->input();
		$result = Supplier::create($supplier);
        return response()->json($result); 
	}

    function update($id, Request $request)
	{
        $supplier = $request->input();
        $edited = Supplier::find($id)->update($supplier);
        if($edited == true){
            return response()->json(Supplier::find($id));
        }
        else{
            return response()->json(["error" => "Đã có lỗi xảy ra"],500);
        }       
	}

    function remove($id)
	{
		Supplier::destroy($id);
	}
}