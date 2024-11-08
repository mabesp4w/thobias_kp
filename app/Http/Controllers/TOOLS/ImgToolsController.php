<?php

namespace App\Http\Controllers\TOOLS;

use Illuminate\Support\Facades\Storage;

class ImgToolsController
{
    public function addImage($folder, $file)
    {
        // set name image and get extension
        $name = time() . '.' . $file->getClientOriginalExtension();
        // destination path
        return Storage::putFileAs($folder, $file, $name);
    }
}
