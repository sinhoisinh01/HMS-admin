<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::middleware("cORSFilter")->get("/supplier",'SupplierController@getAll');
Route::get('/test', function (Request $request) {
	return 'Test CorsFilter';
})->middleware('cORSFilter');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
