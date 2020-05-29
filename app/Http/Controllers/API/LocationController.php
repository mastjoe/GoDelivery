<?php

namespace App\Http\Controllers\API;

use App\Location;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class LocationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //
        $limit = 20;
        if ($request->limit) {
            $limit = \intval($request->limit);
        }

        if ($request->has('query')) {
            $q = $request->query;

            $locations = Location::where('name', 'LIKE', $q.'%')
                ->orWhere('vicinity', 'LIKE', $q.'%')
                ->take($limit)
                ->get();
        } else {
            $locations = Location::all()->take($limit);
        }

        return response()->json([
            'status'  => 'success',
            'data'    => $locations,
            'message' => "locations retrieved"
        ]);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $request->validate([
            'name'      => 'required|string',
            'vicinity'  => 'required|string',
            'latitude'  => 'required|numeric',
            'longitude' => 'required|numeric'
        ]);
        
        $geo_target = Location::where(function($query) use($request) {
            $query->where('longitude', $request->longitude);
            $query->where('latitude', $request->latitude);
        })
            ->orWhere(function($query) use($request) {
                $query->where('name', $request->name);
                $query->where('vicinity', $request->vicinity);
            });
        
        if ($geo_target->count()) {
            $location = $geo_target->first();
            $message  = "location already exist";
        } else {
            $location = Location::create($request->all());
            $message  = "new location created";
        }

        return response()->json([
            'status'  => 'success',
            'message' => $message,
            'data'    => $location
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }
}
