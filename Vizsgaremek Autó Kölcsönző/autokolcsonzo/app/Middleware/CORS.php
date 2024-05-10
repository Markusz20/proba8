<?php

namespace App\Middleware;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\Middleware\BaseMiddleware;

class CORS extends BaseMiddleware
{
    public function handle(RequestInterface $request, \Closure $next)
    {
        // Engedélyezzük a CORS-t minden eredeti webhelyről (nem ajánlott a termelési környezetben)
        header('Access-Control-Allow-Origin: *');
        // A kérési módszerek engedélyezése
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        // Az engedélyezett fejlécek felsorolása
        header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

        // Csak akkor küldünk vissza választ a preflight kérésre, ha a kérés OPTIONS típusú
        if ($this->request->getMethod() === 'OPTIONS') {
            return $this->response->setStatusCode(200);
        }

        return $next($request);
    }
}
