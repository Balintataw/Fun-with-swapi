<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SinglePageController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */

    public function index() {
        return view('app');
    }
}
