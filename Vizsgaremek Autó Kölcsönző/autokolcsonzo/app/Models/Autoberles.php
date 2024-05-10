<?php
namespace App\Models;
use CodeIgniter\Model;

class Nevnap extends Model
{
    protected $table ="autok";
    protected $returnType = "object";
    protected $allowedFields=["id", "rendszam", "tipus", "evjarat", "szin", "foglalt"];//updatenál van jelentősége

    public function getAll()
    {
        return $this->findAll(); // mindent visszad 
    }

    public function getfoglalt($id)//Navbarnál kéri le a belépett felhasználó adatait
    {
        return $this->where("id", $id)->findAll(); // mindent visszad 
    }
    
}