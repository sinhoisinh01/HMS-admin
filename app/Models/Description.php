<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Description extends Model
{
    protected $table = 'descriptions';
    public $timestamps = false;
    protected $guarded = [];
    protected $hidden = [];
    public function subcategoryWork()
    {
        return $this->belongsTo('App\Models\SubcategoryWork');
    }
}
