<?php

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Route;

Route::get('/{any}', function () {
    return File::get(public_path('index.html'));
})->where('any', '^(?!api|storage|js|css|images|fonts|favicon\.ico|robots\.txt).*$');
