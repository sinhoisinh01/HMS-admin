<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ConstructionResource extends Model
{
    protected $table = 'construction_resource';
    protected $guarded = [];
	public $timestamps = false;

	public contruction(){
		return $this->belongsTo("App\Models\Construction");
	}
	public resource(){
		return $this->belongsTo("App\Models\Resource");
	}
}