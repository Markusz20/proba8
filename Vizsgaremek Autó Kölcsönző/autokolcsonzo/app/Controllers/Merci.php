<?php
namespace App\Controllers;
use App\Models\Mercik;

class Merci extends BaseController
{
    public function lista()
    {
        $request =request();
        if($request->getMethod()=="get")
        {
            $model=model(Mercik::class);//csatlakozunk a modelhez
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