<?php
namespace App\Controllers;

use App\Models\Berlok;
use App\Helpers\JWTHelper;
class Admin extends BaseController
{ 
    //http://localhost/autokolcsonzo/public/admin/lista
    public function lista()
    {
        $request =request();
        if($request->getMethod()=="get")
        {
            $model=model(Berlok::class);//csatlakozunk a modelhez
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

    //http://localhost/autokolcsonzo/public/admin/lista2
    public function lista2()
    {
        $request =request();
        if($request->getMethod()=="get")
        {
            $model=model(Berlok::class);//csatlakozunk a modelhez
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
      //http://localhost/autokolcsonzo/public/admin/listaid 
      //belépett felhasználó adatait kéri le.
      public function listaid()
      {
          $request=request();
          $bejovo=$request->getJSON();
          $id = $bejovo->listaid;  
          if($request->getMethod()=="post")
          {
            $model=model(Berlok::class);//csatlakozunk a modelhez
            if (isset($id))
            {
                $adatok = $model->getLoginId($id);         
                $response=response();
                return $response->setJSON($adatok);                
            }
            else
            {
                $response=response();
                return $response->setStatusCode(400)->setBody("Hiányzó paraméter");
            }
         }
          else
          {
              $response=response();
              return $response->setStatusCode(400)->setBody("Nem megfelelő HTTP metódus");
          }  
      }

      //http://localhost/autokolcsonzo/public/admin/listaidmod 
      //belépett felhasználó adatait kéri le a módosításhoz
      public function listaidmod()
      {
          $request=request();
          $bejovo=$request->getJSON();
          $id = $bejovo->listaidmod;       

          if($request->getMethod()=="post")//get volt
          {
            $model=model(Berlok::class);//csatlakozunk a modelhez
            if (isset($id))
            {
                $adatok = $model->getLoginId($id);         
                $response=response();
                return $response->setJSON($adatok);                
            }
            else
            {
                $response=response();
                return $response->setStatusCode(400)->setBody("Hiányzó paraméter");
            }
         }
          else
          {
              $response=response();
              return $response->setStatusCode(400)->setBody("Nem megfelelő HTTP metódus");
          }  
      } 

    //http://localhost/autokolcsonzo/public/admin/register
    public function register()
    {
        $request=request(); // kérés  
      
        if ($request->getMethod()=="post") // ha a kérés típusa post (adatbevitel)
        {       
            $frontendtol=$request->getJSON();     
    
            if(!isset($frontendtol->nev) || !isset($frontendtol->email) || !isset($frontendtol->jelszo))
            {
                $response =response();
                $response->setStatusCode(400);
                $response->setBody("Hiányos adatok."); // a hibaüzenet kiírása
                $response->send();          
            }
            else
            {
                $hashedPassword = password_hash($frontendtol->jelszo, PASSWORD_DEFAULT);
                $beadat = [
                    'nev' => $frontendtol->nev,
                    'email' => $frontendtol->email,
                    'jelszo' => $hashedPassword,
                ];                   
                $model=model(Berlok::class);
                $letezoemail=$model->vanemail($beadat['email']);
                if ($letezoemail==false)
                {
                    if ($model->insAdat($beadat)==true) // tartalma és a típusa is megegyezik e
                        {                            
                        $response=response();
                        return $response->setStatusCode(201)->setJSON(["newid"=>$model->getInsertID()]);
                        }
                        else
                        {
                        $response=response();
                        return $response->setStatusCode(400)->setBody("Sikertelen adatlétrehozás");                        
                        }                     
                }
                else
                {
                    $response=response();                    
                    $response->setStatusCode(400);
                    $response->setBody("Ezzel az e-mail címmel regisztráltak már."); // a hibaüzenet kiírása
                    $response->send();   
                }           
            }
        }
        else
        {   
            $response=response();
            $response->setStatusCode(400);
            $response->setBody("Nem megfelelő Methódus típus"); // a hibaüzenet kiírása
            $response->send();   
        }     
    }

//http://localhost/autokolcsonzo/public/admin/belepes
    public function belepes()
    {
        $request=request(); // kérés  
        if ($request->getMethod()=="post") 
        {       
            $adatok=$request->getJSON();
            if((!isset($adatok->email)) || (!isset($adatok->jelszo)))
            {
                $response =response();
                $response->setStatusCode(400);
                $response->setBody("Hiányos adatok."); // a hibaüzenet kiírása
                $response->send();           
            }
            else
            {
                $hashedPassword = password_verify($adatok->jelszo, PASSWORD_DEFAULT);
                $beadat = [
                    'email' => $adatok->email,
                    'jelszo' => $hashedPassword,
                ];

                $model=model(Berlok::class);      
                $letezofelhasznalo=$model->van($beadat['email'], $beadat['jelszo']);
                if ($letezofelhasznalo==true)
                {                    
                    $id=$model->getVar($beadat['email']);                               
                    $response=response();                    
                    $response->setStatusCode(200);
                    $response->setJSON($id);
                    $response->send();                    
                }
                else
                {
                    $response=response();                    
                    $response->setStatusCode(400);
                    $response->setBody("Nincs ilyen adatokkal regisztrált felhasználó !"); // a hibaüzenet kiírása
                    $response->send();   
                }           
            }
        }
        else
        {   
            $response=response();
            $response->setStatusCode(400);
            $response->setBody("Nem megfelelő Methódus típus"); // a hibaüzenet kiírása
            $response->send();   
        }       
    }
    //http://localhost/autokolcsonzo/public/admin/adatmodosit
    public function adatmodosit()
    { 
        $request=request();  
        if($request->getMethod()=="post")
        {   
            $adatok = $request->getJSON();    
            $id = $adatok->id;       
            if (isset($id)) 
            {
            $modadat = [        
                'nev'=>$adatok->nev,
                'jogositvanyszama'=>$adatok->jogositvanyszama, //a jsonből érkező változó nem muszáj hogy azonos legyen
                'telefonszam'=>$adatok->telefonszam,
                'szuletesiido'=>$adatok->szuletesiido,                
                'isz'=>$adatok->isz,
                'cim'=>$adatok->cim,
                'varos'=>$adatok->varos,          
                'biztonsagikod'=>$adatok->biztonsagikod,    
            ]; // ez jön a frontendtől amit már asszociatív tömbbé alakítottunk 
                $model = model(Berlok::class);              
                $model->updAdat($id, $modadat);  
                $response=response();
                return $response->setStatusCode(200)->setBody("OK");
            } 
            else
            {
                $response = response(); //ez nem kell mert másképpen nem is jutunk ide.
                return $response->setStatusCode(400)->setBody("Hiányzó ID");
            }
        } 
        else 
        { 
            $response = response();
            return $response->setStatusCode(400)->setBody("Rossz methódus");
        }
    }
     //http://localhost/autokolcsonzo/public/admin/biztonsagi
     public function biztonsagi()
     {
         $request=request(); // kérés  
         if ($request->getMethod()=="post") 
         {       
             $adatok=$request->getJSON();
             if((!isset($adatok->email)) || (!isset($adatok->biztonsagikod)))
             {
                 $response =response();
                 $response->setStatusCode(400);
                 $response->setBody("Hiányos adatok."); // a hibaüzenet kiírása
                 $response->send();            
             }
             else
             {               
                 $beadat = [
                     'email' => $adatok->email,
                     'biztonsagikod' => $adatok->biztonsagikod,
                 ];                      
                 $model=model(Berlok::class);      
                 $letezofelhasznalo=$model->vanbizkod($beadat['email'], $beadat['biztonsagikod']);
                 if ($letezofelhasznalo==true)
                 {                    
                     $id=$model->getVar($beadat['email']);
                     $response=response();                    
                     $response->setStatusCode(200);
                     $response->setJSON($id);
                     $response->send();                    
                 }
                 else
                 {
                     $response=response();                    
                     $response->setStatusCode(400);
                     $response->setBody("Nincs ilyen adatokkal regisztrált felhasználó !"); // a hibaüzenet kiírása
                     $response->send();   
                 }           
             }
         }
         else
         {   
             $response=response();
             $response->setStatusCode(400);
             $response->setBody("Nem megfelelő Methódus típus"); // a hibaüzenet kiírása
             $response->send();   
         }       
      }

     //http://localhost/autokolcsonzo/public/admin/jelszomod
    public function jelszomod()
    { 
        $request=request();  
        if($request->getMethod()=="post")
        {   
            $adatok = $request->getJSON();    
            $id = $adatok->id;      
            if (isset($id)) 
            {
            $modadat = [        
                'jelszo'=>$adatok->jelszo,  
            ]; 
                $model = model(Berlok::class);              
                $model->updAdat($id, $modadat);  
                $response=response();
                return $response->setStatusCode(200)->setBody("Sikeres módosítás");
            } 
            else
            {
                $response = response(); //ez nem kell mert másképpen nem is jutunk ide.
                return $response->setStatusCode(400)->setBody("Hiányzó ID");
            }
        } 
        else 
        { 
            $response = response();
            return $response->setStatusCode(400)->setBody("Rossz methódus");
        }
    }
}