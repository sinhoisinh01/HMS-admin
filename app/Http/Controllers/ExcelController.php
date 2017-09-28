<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Routing\Controller;
use Excel;
class ExcelController extends Controller
{
  function export(Request $request){
    $source = $request->input("source");
    $type = $request->input("type");
    $allowType = ["csv", "xlxs", "xls"];
    $searchIndex = array_search($type,$allowType);
    if($type && $searchIndex >= 0){
      Excel::create('Filename', function($excel) use($source) {
        // Set the title
        $excel->setTitle('Our new awesome title');

        // Chain the setters
        $excel->setCreator('Maatwebsite')
        ->setCompany('Maatwebsite');

        // Call them separately
        $excel->setDescription('A demonstration to change the file properties');

        $excel->sheet("sheet_1",function ($sheet) use($source)  {
          $sheet->setOrientation('landscape');

          $sheet->fromArray($source, null, 'A1', false);
        });
      })->export($type);
    }
    else{
      $error = ["status" => "Định dạng tập tin sai !"];
      return response()->json($error, 422);
    }
  }
  function import(Request $request){
    $file = $request->file("file");
    $result = Excel::load($file, function($reader) {

        // Getting all results
      $results = $reader->get();

        // ->all() is a wrapper for ->get() and will work the same
      $results = $reader->all();

    })->get();

    return response()->json($result, 200);
  }
}