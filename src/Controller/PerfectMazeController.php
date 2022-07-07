<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class PerfectMazeController extends AbstractController
{
    /**
     * @Route("/home", name="homepage")
     */
    public function homepage(Request $request): Response
    {
        return $this->render('perfect_maze/home.html.twig', [
        ]);
    }

    /**
     * @Route("/perfectMaze", name="perfectMaze")
     */
    public function perfectMaze(Request $request): Response
    {
        $width = $request->query->get('width');
        $height = $request->query->get('height');
        return $this->render('perfect_maze/perfect_maze.html.twig', [
            'width' => $width,
            'height' => $height
        ]);
    }
}
