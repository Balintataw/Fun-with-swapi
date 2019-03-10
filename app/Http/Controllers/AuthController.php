<?php

namespace App\Http\Controllers;

use Auth;
// use JWTAuth;
use Webpatser\Uuid\Uuid;;
use App\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $user = new User;
        $user->email = $request->email;
        $user->name = "Biff Tannen";
        $user->password = bcrypt($request->password);
        $user->token = Uuid::generate(4)->string;
        $user->save();


        return response([
            'status' => 'success',
            'data' => $user,
            'token' => $user->token
        ], 200);
    }

    public function login(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        // $token = $user->token;
        // $token = JWTAuth::attempt($credentials);
        // if (!$token) {
        //     return response([
        //         'status' => 'error',
        //         'error' => 'invalid.credentials',
        //         'msg' => 'Invalid Credentials.'
        //     ], 400);
        // }

        return response(['user' => $user]);
        // return response([ 'status' => 'success' ])->header('Authorization', $token);
    }

    public function user(Request $request)
    {
        $user = User::find(Auth::user()->id);

        return response([
            'status' => 'success',
            'data' => $user
        ]);
    }

    public function refresh()
    {
        return response([
            'status' => 'success'
        ]);
    }

    public function logout()
    {
        return response([
            'status' => 'success',
            'msg' => 'Logged out Successfully.'
        ], 200);
    }

}