<?php
namespace App\Http\Controllers;
use App\Models\Work;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Routing\Controller;
class WorkController extends Controller
{
    function getOne($workId){
        return response()->json(Work::where('construction_id', 1)->where('id',$workId)->first());
    }
    function getAll(Request $request)
    {
        $index = $request->input('index'); 
        $limit = $request->input('limit');
        return response()->json(Work::where('construction_id', 1)->take($limit)->skip($index)->get());
    }
    function getPage($numberOfRecord){
    	$works = Work::where('construction_id',1)->get();
        $numberOfRecord = intval($numberOfRecord);
    	$pages = intval(sizeof($works) / $numberOfRecord) + 1;
    	return response()->json(["pages" => $pages]);
    }

	function add(Request $request)
	{
		$work = $request->input();
		$result = Work::create($work);
        return response()->json($result); 
	}

    function update($id, Request $request)
	{
        $work = $request->input();
        $edited = Work::find($id)->update($work);
        if($edited == true){
            return response()->json(Work::find($id));
        }
        else{
            return response()->json(["error" => "Đã có lỗi xảy ra"],500);
        }       
	}

    function remove($id)
	{
		Work::destroy($id);
	}
}