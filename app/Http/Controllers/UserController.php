<?php
namespace App\Http\Controllers;
use App\Models\User;
use App\Utils\UrlManagement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Routing\Controller;
class UserController extends Controller
{
    function getOne($userId){
    	$user = User::where('id',$userId)->first();
    	$user['google_id'] = "***";
    	$user['refresh_token'] = "***";
    	$user['token'] = "***";
        return response()->json($user);
    }
    function getAll(Request $request)
    {
        $index = $request->input('index'); 
        $limit = $request->input('limit');
        $users = User::take($limit)->skip($index)->get();
        $length = sizeof($users);
        for($i = 0; $i < $length; $i++){
        	$users[$i]['google_id'] = "***";
	    	$users[$i]['refresh_token'] = "***";
	    	$users[$i]['token'] = "***";
        }
        return response()->json($users);
    }
    function getPage($numberOfRecord){
    	$users = User::get();
        $numberOfRecord = intval($numberOfRecord);
    	$pages = intval(sizeof($users) / $numberOfRecord) + 1;
    	return response()->json(["pages" => $pages]);
    }

	function add(Request $request)
	{
		$user = $request->input();
		$result = User::create($user);
        return response()->json($result); 
	}

    function update($id, Request $request)
	{
        $user = $request->input();
        $edited = User::find($id)->update($user);
        if($edited == true){
            return response()->json(User::find($id));
        }
        else{
            return response()->json(["error" => "Đã có lỗi xảy ra"],500);
        }       
	}

    function remove($id)
	{
		User::destroy($id);
	}
}