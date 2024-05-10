<?php
namespace App\Controllers;
use App\Models\Kiak;

class Kia extends BaseController
{
    public function lista()
    {
        $request =request();
        if($request->getMethod()=="get")
        {
            $model=model(Kiak::class);//csatlakozunk a modelhez
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