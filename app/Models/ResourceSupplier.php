<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ResourceSupplier extends Model
{
 	public $timestamps = false;
    protected $table = 'resource_supplier';
    protected $guarded = [];
    //protected $visible = ['resource_id', 'price'];

    public function resource(){
    	return $this->belongsTo("App\Models\Resource","resource_id","id")->select(["id","code","name","unit"]);
    }
    public function supplier(){
    	return $this->belongsTo("App\Models\Supplier","supplier_id","id");
    }

}