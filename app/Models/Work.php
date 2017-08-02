<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Work extends Model
{
    protected $table = 'works';
    public $timestamps = false;
    protected $guarded = [];
    //protected $visible = ['id', 'code', 'name', 'unit', 'price'];
    public function construction()
    {
        return $this->belongsTo('App\Models\Construction');
    }
    public function resources()
    {
        return $this->belongsToMany('App\Models\Resource');
    }
	
	public function resource_work()
    {
        return $this->hasMany('App\Models\ResourceWork');
    }
	
	public function subcategory_work()
    {
        return $this->belongsTo('App\Models\SubcategoryWork');
    }
}
