<?php
namespace App\Controllers;
use App\Models\Kolcsonzes;

class Kolcson extends BaseController
{
    //http://localhost/autokolcsonzo/public/kolcson/lista
    public function lista()
    {
        $request = request();
        if ( $request->getMethod() == 'get' )
        {
            $model = model( Kolcsonzes::class );
            //csatlakozunk a modelhez
            $adatok = $model->getAll();
            $response = response();
            return $response->setJSON( $adatok );
        } else {
            $response = response();
            return $response->setStatusCode( 400 )->setBody( 'Nem megfelelő HTTP metódus' );
        }
    }

    //http://localhost/autokolcsonzo/public/kolcson/rendelesek
    public function rendelesek()//adott felhasználó rendelései
    {
        $request = request();
        $bejovo = $request->getJSON();
        $id = $bejovo->berloid;
        if ( $request->getMethod() == 'post' )
        {
            $model = model( Kolcsonzes::class );
            //csatlakozunk a modelhez
            $adatok = $model->rendeles( $id );
            $response = response();
            return $response->setJSON( $adatok );
        } else {
            $response = response();
            return $response->setStatusCode( 400 )->setBody( 'Nem megfelelő HTTP metódus' );
        }

    }

    //http://localhost/autokolcsonzo/public/kolcson/ujadatbeszur
    public function ujadatbeszur()
    {
        $request = request();
        // kérés
        if ( $request->getMethod() == 'post' ) // ha a kérés típusa post ( adatbevitel )
        {
            $frontendtol = $request->getJSON();
            $beadat = [
                'berloid'=>$frontendtol->berloid,
                'autoid'=>$frontendtol->autoid, //a jsonből érkező változó nem muszáj hogy azonos legyen
                'berletkezdete'=>$frontendtol->berletkezdete,
                'berletvege'=>$frontendtol->berletvege,
                'napokszama'=>$frontendtol->napokszama,
                'napidij'=>$frontendtol->napidij,
            ];
            $model = model( Kolcsonzes::class );
            if ( $frontendtol->berletkezdete>$frontendtol->berletvege )
            {
                $response = response();
                return $response->setStatusCode( 400 )->setBody( 'A kezdő dátum későbbi mint a vég dátum' );
            } else {
                $van = $model->vankolcson( $beadat[ 'autoid' ] );
                if ( $van == true )
                {
                    $adatbazis_kezdo = array_column( $van, 'berletkezdete' );
                    $adatbazis_vege = array_column( $van, 'berletvege' );
                    foreach ( $adatbazis_kezdo as $adatbazis_kezdo_datum ) 
                    {
                        if ( strtotime( $frontendtol->berletkezdete ) > strtotime( $adatbazis_kezdo_datum ) ) 
                        {          
                            foreach ( $adatbazis_vege as $adatbazis_vege_datum ) 
                            {
                                if ( strtotime( $frontendtol->berletvege ) > strtotime( $adatbazis_vege_datum ) ) 
                                {
                                    if ( $model->insBerles( $beadat ) ) 
                                    {
                                        $response = response();
                                        return $response->setStatusCode( 201 )->setJSON( [ 'newid' => $model->getInsertID() ] );
                                    } else {
                                        $response = response();
                                        return $response->setStatusCode( 400 )->setBody( 'Sikertelen adatlétrehozás' );
                                    }
                                } else {
                                    $response = response();
                                    return $response->setStatusCode( 400 )->setBody( 'Az autót már lefoglalták.' );
                                }
                            }
                        } else {
                            $response = response();
                            return $response->setStatusCode( 400 )->setBody( 'Az autót már lefoglalták.' );
                        }
                    }

                } else {
                    if ( $model->insBerles( $beadat ) == true ) // tartalma és a típusa is megegyezik e
                    {
                        $response = response();
                        return $response->setStatusCode( 201 )->setJSON( [ 'newid'=>$model->getInsertID() ] );
                    } else {
                        $response = response();
                        return $response->setStatusCode( 400 )->setBody( 'Sikertelen adatlétrehozás' );
                    }
                }
            }
        } else {
            $response = response();
            return $response->setStatusCode( 400 )->setBody( 'Nem megfelelő Methódus típus' );
            // ha nem POSt-al küld a frontend adatot
        }
    }

    //http://localhost/autokolcsonzo/public/kolcson/kolcsontorolid
    public function kolcsontorolid()
    {
        $request = request();
        $bejovoadat = $request->getJSON();
        $id = $bejovoadat->id;
        if ( $request -> getMethod() == 'delete' && isset( $id ) )
        {
            $model = model( Kolcsonzes::class );
            $model->delkolcsonzes( $id );
            $response = response();
            return $response->setStatusCode( 200 )->setBody( 'Törlés sikeres: '.$id );
        } else {
            $response = response();
            return $response->setStatusCode( 400 )->setBody( 'Rossz kérés' )->send();
        }
    }
    //http://localhost/autokolcsonzo/public/kolcson/kolcsonmod 
    //belépett felhasználó adatait kéri le a módosításhoz
    public function kolcsonmod()
    {
        $request = request();

        if ( $request->getMethod() == 'post' )
        {  
            $adatok = $request->getJSON();
            $id = $adatok->id;
            if ( isset( $id ) ) 
            {
                $modadat = [
                    'id'=>$adatok->id,
                    'berloid'=>$adatok->berloid,
                    'autoid'=>$adatok->autoid,
                    'tipus'=>$adatok->tipus,
                    'berletkezdete'=>$adatok->berletkezdete, //a jsonből érkező változó nem muszáj hogy azonos legyen
                    'berletvege'=>$adatok->berletvege,
                    'napokszama'=>$adatok->napokszama,
                    'napidij'=>$adatok->napidij,
                ];
                $model = model(Kolcsonzes::class);
                if(($adatok->berletkezdete) > ($adatok->berletvege))
                {
                   $response = response();    
                    return $response->setStatusCode(400)->setBody('A kezdő dátum későbbi mint a vég dátum');
                } 
                else 
                {  
                
                        $model->updAdat( $id, $modadat );
                        $response = response();
                        return $response->setStatusCode( 200 )->setBody( 'Sikeresen módosítva' );
                    }
                
            } 
            else 
            {
                $response = response();
                //ez nem kell mert másképpen nem is jutunk ide.
                return $response->setStatusCode( 400 )->setBody( 'Hiányzó ID' );
            }
        } 
        else 
        {

            $response = response();
            return $response->setStatusCode( 400 )->setBody( 'Rossz methódus' );
        }
    }
    //http://localhost/autokolcsonzo/public/kolcson/rendelesekid
    public function rendelesekid()//adott rendelés adatainak lekérdezése 
    {
        $request = request();
        $bejovo = $request->getJSON();
        $id = $bejovo->rendid;
        if ( $request->getMethod() == 'post' )
        {
            $model = model( Kolcsonzes::class );
            $adatok = $model->rendelesid( $id );
            $response = response();
            return $response->setJSON( $adatok );
        } else {
            $response = response();
            return $response->setStatusCode( 400 )->setBody( 'Nem megfelelő HTTP metódus' );
        }
    }
}