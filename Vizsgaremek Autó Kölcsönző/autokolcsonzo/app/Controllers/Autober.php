<?php
namespace App\Controllers;
use App\Models\Autoberles;

class Autober extends BaseController
{
    //http://localhost/autokolcsonzo/public/autober/lista
    public function lista()
    {
        $request =request();
        if($request->getMethod()=="get")
        {
            $model=model(Autoberles::class);//csatlakozunk a modelhez
            $adatok=$model->getAll();
            $response=response();
            return $response->setJSON($adatok);
        }
        else
        {
            $response=response();
            return $response->setStatusCode(400)->setBody("Nem megfelelő HTTP metódus");
        }
    }

    //Nem használt 
    //public function foglalt()
    // {
    //     $request =request();
    //     if($request->getMethod()=="get")
    //     {
    //         $model=model(Autoberles::class);//csatlakozunk a modelhez
    //         $adatok=$model->getAll();
    //         $response=response();
    //         return $response->setJSON($adatok);
    //     }
    //     else
    //     {
    //         $response=response();
    //         return $response->setStatusCode(400)->setBody("Nem megfelelő HTTP metódus");
    //     }
    // }
}