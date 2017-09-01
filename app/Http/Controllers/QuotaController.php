<?php
namespace App\Http\Controllers;
use App\Models\ResourceWork;
use App\Models\Resource;
use App\Models\Work;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Routing\Controller;
class QuotaController extends Controller
{
    function getOne($workId, $resourceId){
        return response()->json(ResourceWork::where('work_id', $workId)->where('resource_id', $resourceId)->get());
    }

    function getAll(Request $request)
    {
        $index = $request->input('index'); 
        $limit = $request->input('limit');
        $quotas = ResourceWork::all()->groupBy('work_id');
        $quotas = collect($quotas);
        $result = [];
        $length = sizeof($quotas);
        for($i = 1; $i <= $length; $i++){
        	array_push($result, $quotas[$i]);
        }
        return response()->json(array_slice($result, $index, $limit));
    }

    function getPage($numberOfRecord){
    	$quotas = ResourceWork::get();
        $numberOfRecord = intval($numberOfRecord);
    	$pages = intval(sizeof($quotas) / $numberOfRecord) + 1;
    	return response()->json(["pages" => $pages]);
    }

	function add(Request $request)
	{
		$quota = $request->input();
		$result = ResourceWork::create($quota);
        return response()->json($result);
	}

    function update($workId, $resourceId, Request $request)
	{
        $quota = $request->input();
        $edited = ResourceWork::where("work_id",$workId)->where("resource_id",$resourceId)->update($quota);
        if($edited == true){
            return response()->json(ResourceWork::where("work_id",$workId)->where("resource_id",$resourceId));
        }
        else{
            return response()->json(["error" => "Đã có lỗi xảy ra"],500);
        }       
	}

    function remove($workId,$resourceId)
	{
		Supplier::destroy($id);
	}
}