<?php
namespace App\Models;
use CodeIgniter\Model;

class Berlok extends Model
{
    protected $table ="berlok";
    protected $returnType = "object";
    protected $allowedFields=["id", "nev", "jogositvanyszama", "telefonszam", "szuletesiido","jelszo","email","isz","varos","cim", "biztonsagikod" ];//updatenál van jelentősége

    public function getAll() //lista(), lista2()
    {
        return $this->findAll(); // mindent visszad 
    }

    public function getLoginId($id)//Navbarnál kéri le a belépett felhasználó adatait
    {   //listaid(); listaidmod()
        return $this->where("id", $id)->findAll(); // mindent visszad 
    }


    public function insAdat($adat)
    {   //register()
        return $this->insert($adat, false); //adatbeszúrás a alaphelyzetben a visszatérési értéke true lesz és a tid et adja vissza 
        //Ha a beírjuk hogy false akkor tudunk változtatni rajta.
    }

    public function vanemail($email)
    { //register()
        $vizsgal=$this->where('email', $email)->findAll();
        if (count($vizsgal)>0) //  ha nagyobb mint 0 akkor azt jelenti van talált            
            return true;
        else   
            return false;
    }

    public function van($email, $jelszo)
    {   //belepes()                
        $vizsgal=$this->where('email', $email)->where('jelszo', $jelszo)->findAll(); 
        if (count($vizsgal)>0) //  ha nagyobb mint 0 akkor azt jelenti van talált  
        return true;
        else   
        return false;
    }

    public function vanbizkod($email, $biztonsagikod)
    {     //biztonsag()      
        $vizsgal=$this->where('email', $email)->where('biztonsagikod', $biztonsagikod)->findAll(); 
        if (count($vizsgal)>0) //  ha nagyobb mint 0 akkor azt jelenti van talált  
        return true;
        else   
        return false;
    }

    public function updAdat($id, $modadat)
    {   //jelszomod(); adatmodosit()
        $this->update($id, $modadat);  
    }

    public function getVar($email)
    {   //biztonsag()
        $vizsgal=$this->where('email', $email)->findAll();
        if (count($vizsgal)>0) //  ha nagyobb mint 0 akkor azt jelenti van talált            
            return $vizsgal[0]->id;
        else   
            return null;
    }

    public function getId($id)
    {   //Nem lett használva
        $vizsgal=$this->where('id', $id)->findAll();
  
        if (count($vizsgal)>0) //  ha nagyobb mint 0 akkor azt jelenti van talált            
            return $vizsgal;
        else   
            return null;
   }
}

