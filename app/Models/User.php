<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $table = 'users';
    public $timestamps = false;
    protected $guarded = [];
    //protected $visible = ['id', 'code', 'name', 'unit', 'price'];
    public function construction()
    {

    }
}