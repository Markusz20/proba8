<?php
namespace App\Models;
use CodeIgniter\Model;

class Kolcsonzes extends Model
{
    protected $table ="kolcsonzes";
    protected $returnType = "object";
    protected $allowedFields=["id", "berloid", "autoid", "berletkezdete", "berletvege", "napokszama", "napidij"];//updatenál van jelentősége

    public function getAll()
    { //lista()
        return $this->findAll(); // mindent visszad 
    }

    public function rendeles($berloid)
    {   //rendelesek(), rendelesekid()
        return $this->select('kolcsonzes.berloid, kolcsonzes.id, berlok.nev, autok.tipus, kolcsonzes.autoid, kolcsonzes.berletkezdete, kolcsonzes.berletvege, kolcsonzes.napokszama, kolcsonzes.napidij, autok.kepek')
                    ->join('berlok', 'kolcsonzes.berloid=berlok.id')
                    ->join('autok', 'kolcsonzes.autoid=autok.id')
                    ->where('berlok.id', $berloid)->findAll();    
    }

    public function insBerles($adat)
    {   //ujadatbeszur()
        return $this->insert($adat, false); //adatbeszúrás a alaphelyzetben a visszatérési értéke true lesz és a tid et adja vissza 
        //Ha a beírjuk hogy false akkor tudunk változtatni rajta.
    }

    public function vankolcson($autoid) // megvizsgálja, hogy az autót kikölcsönöztzék e?
    {   //kolcsonmod()
        $vizsgal=$this->where("autoid", $autoid)->findAll(); // mindent visszad 
        if (count($vizsgal)>0) //  ha nagyobb mint 0 akkor azt jelenti van talált  
        return $vizsgal;
        else   
        return false;
    }
    public function delkolcsonzes($id)
    {   //kolcsontorolid()
        $this->where("id", $id)->delete(); // kölcsönzés idre megy a törlés        
    }

    public function updAdat($id, $modadat){ //kolcsonmod()
        $this->update($id, $modadat);  
    }

    public function getId($id)//lekéri a rendelés főbb adatait
    {   //nem használjuk
        return $this->where("id", $id)->findAll(); // mindent visszad 
    }

    public function rendelesid($rendid)
    {   //rendelesekid()
        return $this->select('kolcsonzes.berloid, kolcsonzes.id, berlok.nev, autok.tipus, autok.id, kolcsonzes.berletkezdete, kolcsonzes.berletvege, kolcsonzes.napokszama, kolcsonzes.napidij, autok.kepek')
                    ->join('berlok', 'kolcsonzes.berloid=berlok.id')
                    ->join('autok', 'kolcsonzes.autoid=autok.id')
                    ->where('kolcsonzes.id', $rendid)->findAll();    
    }

}