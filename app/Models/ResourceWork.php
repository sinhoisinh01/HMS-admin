<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ResourceWork extends Model
{
    public $timestamps = false;
    protected $table = 'resource_work';
    protected $guarded = [];
	
	public function work()
    {
        return $this->belongsTo('App\Models\Work',"work_id","id");
    }
	
	public function resource()
	{
		return $this->belongsTo('App\Models\Resource');
	}
} 