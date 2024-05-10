<?php
namespace App\Controllers;
use App\Models\Audik;

class Audi extends BaseController
{
    public function lista()
    {
        $request =request();
        if($request->getMethod()=="get")
        {
            $model=model(Audik::class);//csatlakozunk a modelhez
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

    
}