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
Route::post("/supplier",'SupplierController@add')->middleware('cORSFilter');
Route::get("/supplier",'SupplierController@getAll')->middleware('cORSFilter');
Route::get("/supplier/{id}",'SupplierController@getOne')->middleware('cORSFilter');
Route::delete("/supplier/{id}",'SupplierController@remove')->middleware('cORSFilter');
Route::put("/supplier/{id}",'SupplierController@update')->middleware('cORSFilter');
Route::get("/supplier/page/{numberOfRecord}",'SupplierController@getPage')->middleware('cORSFilter');

Route::post("/work",'WorkController@add')->middleware('cORSFilter');
Route::get("/work",'WorkController@getAll')->middleware('cORSFilter');
Route::get("/work/{id}",'WorkController@getOne')->middleware('cORSFilter');
Route::delete("/work/{id}",'WorkController@remove')->middleware('cORSFilter');
Route::put("/work/{id}",'WorkController@update')->middleware('cORSFilter');
Route::get("/work/page/{numberOfRecord}",'WorkController@getPage')->middleware('cORSFilter');

Route::post("/quota",'QuotaController@add')->middleware('cORSFilter');
Route::get("/quota",'QuotaController@getAll')->middleware('cORSFilter');
Route::get("/work/{work_id}/quota",'QuotaController@getOne')->middleware('cORSFilter');
Route::delete("/work/{work_id}/resource/{resource_id}",'QuotaController@remove')->middleware('cORSFilter');
Route::put("/work/{work_id}/resource/{resource_id}",'QuotaController@update')->middleware('cORSFilter');
Route::get("/quota/page/{numberOfRecord}",'QuotaController@getPage')->middleware('cORSFilter');

Route::get("/supplier/{supplierId}/resources",'ResourceController@getAllBySupplier')->middleware('cORSFilter');
Route::post("/supplier/{supplierId}/resources",'ResourceController@addToSupplier')->middleware('cORSFilter');
Route::get("/supplier/{supplierId}/resources/page/{numberOfRecord}",'ResourceController@getPage')->middleware('cORSFilter');

Route::post("/resource", "ResourceController@add")->middleware("cORSFilter");
Route::get("/resource/search", "ResourceController@getAll")->middleware("cORSFilter");

Route::post("/excel/export", "ExcelController@export")->middleware("cORSFilter");
Route::post("/excel/import", "ExcelController@import")->middleware("cORSFilter");

Route::get('/test', function (Request $request) {
	return 'Test CorsFilter';
})->middleware('cORSFilter');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
