<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
	public $timestamps = false;

    protected $table = 'suppliers';
    protected $guarded = [];
    protected $hidden = ['user_id'];
    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }
    public function resources()
    {
        return $this->hasMany('App\Models\ResourceSupplier', 'supplier_id', 'id');
    }
}