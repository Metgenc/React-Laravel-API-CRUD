<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserStoreRequest;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function index()
    {
        $users = User::orderBy('id')->get();

        return response()->json([
            'results' => $users
        ],200);
    }

    public function show($id)
    {
        $user = User::find($id);

        if(!$user) {
            return response()->json([
                'message' => 'User not found.'
            ],404);
        }

        return response()->json([
            'results' => $user
        ],200);
    }

    public function store(UserStoreRequest $request)
    {
        try {
            User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => $request->password
            ]);

            return response()->json([
                'message' => 'User successfully created.'
            ],200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong.'
            ],500);
        }
    }

    public function update(UserStoreRequest $request, $id)
    {
        $user = User::find($id);

        if(!$user) {
            return response()->json([
                'message' => 'User not found.'
            ],404);
        }

        try {
            $user->name = $request->name;
            $user->email = $request->email;
            $user->password = $request->password;

            $user->save();

            return response()->json([
                'message' => 'User successfully updated.'
            ],200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong.'
            ],500);
        }
    }

    public function destroy($id)
    {
        $user = User::find($id);

        if(!$user) {
            return response()->json([
                'message' => 'User not found.'
            ],404);
        }

        $user->delete();

        return response()->json([
            'message' => 'User successfully deleted.'
        ],200);
    }
}
