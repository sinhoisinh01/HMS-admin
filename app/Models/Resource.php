<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Resource extends Model
{
    protected $table = 'resources';
    public $timestamps = false;
    protected $guarded = [];
    //protected $visible = ['id', 'code', 'name', 'unit', 'price'];
    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }
	
	public function construction()
	{
		return $this->hasManyThrough('App\Models\ConstructionResources', 'App\Models\Construction');
	}

    public function suppliers(){
        return $this->hasMany('App\Models\ResourceSupplier', 'resource_id', 'id');
    }
}