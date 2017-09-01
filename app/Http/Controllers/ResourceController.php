<?php
namespace App\Http\Controllers;
use App\Models\Resource;
use App\Models\Supplier;
use App\Models\ResourceSupplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Routing\Controller;
use Illuminate\Support\Collection;
class ResourceController extends Controller
{
    function getAllBySupplier($supplierId, Request $request)
    {
        $index = $request->input('index'); 
        $limit = $request->input('limit');
        $supplier = Supplier::where('user_id', 1)->find($supplierId);
        if($supplier != null){
        	$tempResources = $supplier->resources()->where("resource_id","!=",1)->take($limit)->skip($index)->get();
        	$resources = collect([]);
        	$length = sizeof($tempResources);
        	for($i = 0; $i < $length; $i++){
        		$result = [];
        		foreach($tempResources[$i]["attributes"] as $key => $value){
        			$result[$key] = $value;
        		}
        		foreach($tempResources[$i]->resource["attributes"] as $key => $value){
        			$result[$key] = $value;
        		}
        		$resources->push($result);
        	}
        	return response()->json($resources);
        }
        else{
        	return response()->json(["error" => "Không tìm thấy nhà cung cấp"],404);
        }
    }
    function getAll(Request $request){
        $supplierId = $request->input("of");
        $keyword = $request->input('keyword');
        $index = $request->input('index'); 
        $limit = $request->input('limit');
        $resources = Resource::where('user_id', 1)->where("name","LIKE","%".$keyword."%")
                                                  ->where("id","!=",1)
                                                  ->get();
        $resources = collect($resources);
        $length = sizeof($resources);
        $result = collect([]);
        for($i = 0; $i < $length; $i++){
            $suppliers = $resources[$i]->suppliers()->get();
            if($suppliers->isEmpty() == true){
                $result->push($resources[$i]);
            }
            else{
                $flag = 0;
                $length1 = sizeof($suppliers);
                for($j = 0; $j < $length1; $j++){
                    if($suppliers[$j]["supplier_id"] == $supplierId){
                        $flag = 1;
                        break;
                    }
                }
                if($flag == 0){
                    $result->push($resources[$i]);
                }
            }
        }
        $returnArrayResult = $result->toArray();
        $returnArrayResult = array_slice($returnArrayResult,$index,$limit);
        return response()->json($returnArrayResult); 
    }
    function getPage($supplierId, $numberOfRecord){
    	$supplier = Supplier::where('user_id',1)->find($supplierId);
    	if($supplier != null){
    		$resources = $supplier->resources()->get();
    		$numberOfRecord = intval($numberOfRecord);
	    	$pages = intval(sizeof($resources) / $numberOfRecord) + 1;
	    	return response()->json(["pages" => $pages]);
    	}
        else{
        	return response()->json(["error" => "Không tìm thấy nhà cung cấp"],404);
        }
    }

	function add(Request $request)
	{
		$resource = $request->input();
		$result = Resource::create($resource);
        return response()->json($result); 
	}

    function addToSupplier(Request $request)
    {
        $resourceSupplier = $request->input();
        $result = ResourceSupplier::create($resourceSupplier);
        return response()->json($result);
    }

    function update($id, Request $request)
	{
        Supplier::find($id)->update($request->input('supplier'));
	}

    function remove($id)
	{
		Supplier::destroy($id);
	}
}