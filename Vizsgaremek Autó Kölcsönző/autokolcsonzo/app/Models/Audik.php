<?php
namespace App\Models;
use CodeIgniter\Model;

class Nevnap extends Model
{
    protected $table ="audi";
    protected $returnType = "object";
    protected $allowedFields=["id", "rendszam", "tipus", "evjarat", "szin"];//updatenál van jelentősége

    public function getAll()
    {
        return $this->findAll(); // mindent visszad 
    }

    
}