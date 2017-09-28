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
        $quotas = $quotas->toArray();
        $quotas = array_slice($quotas, $index, $limit);
        $results = [];
       	foreach($quotas as $key => $quota){
       		$length = sizeof($quota);
       		$work = Work::where("id", $quota[0]["work_id"])->first();
       		$result = ["work_id" => $quota[0]["work_id"], "work_code" => $work["code"], "work_name" => $work["name"], "work_document" => $work["document"], "quotas" => [ "M" => [], "N" => [],"V" => [] ,]];
       		for($i = 0; $i < $length; $i++){
       			$resource = Resource::where("id", $quota[$i]["resource_id"])->first();
       			if(strpos($resource["code"],"M") === 0){
       				array_push($result["quotas"]["M"], ["resource_id" => $quota[$i]["resource_id"], "resource_value" => $quota[$i]["value"], "resource_name" => $resource["name"], "resource_code" => $resource["code"], "resource_unit" => $resource["unit"]]);
       			}
       			else if(strpos($resource["code"],"N") === 0){
       				array_push($result["quotas"]["N"], ["resource_id" => $quota[$i]["resource_id"], "resource_value" => $quota[$i]["value"], "resource_name" => $resource["name"], "resource_code" => $resource["code"], "resource_unit" => $resource["unit"]]);
       			}
       			else {
					array_push($result["quotas"]["V"], ["resource_id" => $quota[$i]["resource_id"], "resource_value" => $quota[$i]["value"], "resource_name" => $resource["name"], "resource_code" => $resource["code"], "resource_unit" => $resource["unit"]]);
       			}
       		}
       		array_push($results, $result);
       	}
        return response()->json($results);
    }

    function getPage($numberOfRecord){
    	$quotas = $quotas = ResourceWork::all()->groupBy('work_id');
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