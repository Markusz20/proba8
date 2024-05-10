<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index'); // alapbeállítás
$routes->get('/elso', 'Home::elso'); //itt állítjuk be az új wiew-t.
$routes->get('/sajat', 'Elsocont::index'); //itt állítjuk be az új wiew-t.
$routes->get('/sajatelso', 'Elsocont::elso'); //itt állítjuk be az új wiew-t.elso functiont hívjuk meg.
