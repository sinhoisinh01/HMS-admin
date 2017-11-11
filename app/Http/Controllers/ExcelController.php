<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Routing\Controller;
use Excel;
class ExcelController extends Controller
{
  private $allowType = [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/csv"
  ];
  private $extension = ["xls","xlsx","csv"];

  function export(Request $request){
    $source = $request->input("source");
    $type = $request->input("type");
    $searchIndex = array_search($type,$this->extension);
    if($type && $searchIndex >= 0){
      $file = Excel::create('Filename', function($excel) use($source) {
        $excel->getDefaultStyle();
        $excel->sheet("sheet_1",function ($sheet) use($source)  {
          $sheet->setOrientation('landscape');
          $sheet->fromArray($source, null, 'A1', true, true);
        });
      });
      $prefix = "data:" . $this->allowType[$searchIndex] . ";base64,";
      $file = $file->string($type);
      $response =  array(
       'name' => strtotime(date("Y-M-d h:i:s")) . "." . $type,
       'file' => "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,".base64_encode($file)
     );
      return response()->json($response);
    }
    else{
      $error = ["status" => "Định dạng tập tin sai !"];
      return response()->json($error, 422);
    }
  }
  function prepare(Request $request){
    $file = $request->file("file");
    $sheetTitle = Array();
    $result = Excel::load($file, function($reader) use(&$sheetTitle){
      $reader->noHeading();
      $reader->setSeparator(' ');
      $reader->each(function($sheet) use(&$sheetTitle) {
        if($sheet->getTitle() != null)
          array_push($sheetTitle,$sheet->getTitle());
      });
    },"UTF-8")->get();
    $finalResult = ["excel" => $result];
    if(sizeof($sheetTitle) > 0){
      $finalResult["sheetTitle"] = $sheetTitle;
    }
    else{
      $finalResult["sheetTitle"] = ["Sheet_1"];
    }
    return response()->json($finalResult, 200);
  }
  function import(){
    return response()->json("Ok", 200);
  }
}