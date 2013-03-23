////////////////////////////////////////////////////////////////////////////////////
//source.cpp Source for Project Guineapig										///
//By Casey Yardley, Zac Pez and Adrian King										///
//							VERSION: 0.09										///
///////////////////////////////////////////////////////////////////////////////////

///////////////////////////
//		Setup			//
/////////////////////////

//Include

#include <iostream>
#include <fstream>
#include "SDL.h"
#include "sdl_rotozoom.h"
#include "SDL_mixer.h"
//#include "SDL_ttf.h"
#include <math.h>
#include <time.h>
#include <string.h>
using namespace std;

//Setup

SDL_Surface *image;
SDL_Surface *screen;
SDL_Surface *message = NULL;
const int FRAMES_PER_SECOND = 60;

///////////////////////////
//		Load Sprites	//
/////////////////////////

//Characters

SDL_Surface* player = SDL_LoadBMP("data/image/player.bmp");
SDL_Surface* enemy = SDL_LoadBMP("data/image/enemy.bmp");
SDL_Surface* deadenemy = SDL_LoadBMP("data/image/deadenemy.bmp");
SDL_Surface* qwertybody = SDL_LoadBMP("data/image/qwerty.bmp");
SDL_Surface* commabody = SDL_LoadBMP("data/image/comma.bmp");
SDL_Surface* sevenbody = SDL_LoadBMP("data/image/seven.bmp");
SDL_Surface* nullbody = SDL_LoadBMP("data/image/player.bmp");
SDL_Surface* altbody = SDL_LoadBMP("data/image/alt.bmp");
SDL_Surface* f4body = SDL_LoadBMP("data/image/f4.bmp");
SDL_Surface* heliblade = SDL_LoadBMP("data/image/heliblade.bmp");
SDL_Surface* helibody = SDL_LoadBMP("data/image/helibody.bmp");

//Tiles

SDL_Surface* mountain = SDL_LoadBMP("data/image/mountain.bmp");//1
SDL_Surface* forest = SDL_LoadBMP("data/image/forest.bmp");//02
SDL_Surface* grass = SDL_LoadBMP("data/image/grass.bmp");//3
SDL_Surface* cocaine = SDL_LoadBMP("data/image/cocaine.bmp");//4
SDL_Surface* blacktile = SDL_LoadBMP("data/image/black.bmp");//5

//Leave 4-10 blank

SDL_Surface* longgrass = SDL_LoadBMP("data/image/longgrass.bmp");//11
SDL_Surface* sand = SDL_LoadBMP("data/image/sand.bmp");//12
SDL_Surface* pebels = SDL_LoadBMP("data/image/pebels.bmp");//13
SDL_Surface* lake = SDL_LoadBMP("data/image/lake.bmp");//14
SDL_Surface* ocean = SDL_LoadBMP("data/image/ocean.bmp");//15
SDL_Surface* path = SDL_LoadBMP("data/image/path.bmp");//16
SDL_Surface* path2 = SDL_LoadBMP("data/image/path2.bmp");//17
SDL_Surface* housefloor = SDL_LoadBMP("data/image/housefloor.bmp");//18
SDL_Surface* cavefloor = SDL_LoadBMP("data/image/cavefloor.bmp");//19
SDL_Surface* concrete = SDL_LoadBMP("data/image/concrete.bmp");//20
SDL_Surface* fence_vert = SDL_LoadBMP("data/image/fence_vert.bmp");//21
SDL_Surface* fence_horz = SDL_LoadBMP("data/image/fence_horz.bmp");//22
SDL_Surface* fence_topleft = SDL_LoadBMP("data/image/fence_topleft.bmp");//23
SDL_Surface* fence_topright = SDL_LoadBMP("data/image/fence_topright.bmp");//24
SDL_Surface* fence_bottomleft = SDL_LoadBMP("data/image/fence_bottomleft.bmp");//25
SDL_Surface* fence_bottomright = SDL_LoadBMP("data/image/fence_bottomright.bmp");//26
SDL_Surface* verticalsection_tinroof = SDL_LoadBMP("data/image/verticalsection_tinroof.bmp");//27
SDL_Surface* horizontalsection_tinroof = SDL_LoadBMP("data/image/horizontalsection_tinroof.bmp");//28
SDL_Surface* bottomright_tinroof = SDL_LoadBMP("data/image/bottomright_tinroof.bmp");//29
SDL_Surface* bottomleft_tinroof = SDL_LoadBMP("data/image/bottomleft_tinroof.bmp");//30
SDL_Surface* topleft_tinroof = SDL_LoadBMP("data/image/topleft_tinroof.bmp");//31
SDL_Surface* topright_tinroof = SDL_LoadBMP("data/image/topright_tinroof.bmp");//32
SDL_Surface* top_tinroof = SDL_LoadBMP("data/image/Copy of verticalsection_tinroof.bmp");//33
SDL_Surface* left_tinroof = SDL_LoadBMP("data/image/Copy of horizontalsection_tinroof.bmp");//34

//Items

SDL_Surface* bullet = SDL_LoadBMP("data/image/bullet.bmp");
SDL_Surface* cokeplant = SDL_LoadBMP("data/image/cokeplant.bmp");
SDL_Surface* note = SDL_LoadBMP("data/image/note.bmp");

//GUI

SDL_Surface* bignote = SDL_LoadBMP("data/image/notebig.bmp");
SDL_Surface* qwertydir = SDL_LoadBMP("data/image/directionqwerty.bmp");
SDL_Surface* intro = SDL_LoadBMP("data/image/intro.bmp");
SDL_Surface* guiside = SDL_LoadBMP("data/image/GUIside.bmp");
SDL_Surface* guibottom = SDL_LoadBMP("data/image/GUIbottom.bmp");
SDL_Surface* BG = SDL_LoadBMP("data/image/BG.bmp");

///////////////////////////
//          MAIN		//
//////////////////////////

int main(int argc, char *argv[])
{

///////////////////////////////////
//		Sprite Transparency		//
// Transparency is:	#FF00FF		//
// or "0xFF, 0, 0xFF"			//
//////////////////////////////////

//Player
Uint32 playerkey = SDL_MapRGB(player->format, 0xFF, 0, 0xFF );
SDL_SetColorKey( player, SDL_SRCCOLORKEY, playerkey );

//Enemy
Uint32 enemykey = SDL_MapRGB(enemy->format, 0xFF, 0, 0xFF );
SDL_SetColorKey( enemy, SDL_SRCCOLORKEY, enemykey );

//Dead Enemy
Uint32 denemykey = SDL_MapRGB(deadenemy->format, 0xFF, 0, 0xFF );
SDL_SetColorKey( deadenemy, SDL_SRCCOLORKEY, denemykey );

//Dead qwerty
Uint32 qwertykey = SDL_MapRGB(qwertybody->format, 0xFF, 0, 0xFF );
SDL_SetColorKey( qwertybody, SDL_SRCCOLORKEY, qwertykey );

//Dead comma
Uint32 commakey = SDL_MapRGB(commabody->format, 0xFF, 0, 0xFF );
SDL_SetColorKey( commabody, SDL_SRCCOLORKEY, commakey );

//Dead seven
Uint32 sevenkey = SDL_MapRGB(sevenbody->format, 0xFF, 0, 0xFF );
SDL_SetColorKey( sevenbody, SDL_SRCCOLORKEY, sevenkey );

//Dead null
Uint32 nullkey = SDL_MapRGB(nullbody->format, 0xFF, 0, 0xFF );
SDL_SetColorKey( nullbody, SDL_SRCCOLORKEY, nullkey );

//Dead Alt
Uint32 altkey = SDL_MapRGB(altbody->format, 0xFF, 0, 0xFF );
SDL_SetColorKey( altbody, SDL_SRCCOLORKEY, altkey );

//Dead F4
Uint32 f4key = SDL_MapRGB(f4body->format, 0xFF, 0, 0xFF );
SDL_SetColorKey( f4body, SDL_SRCCOLORKEY, f4key );

//Player Bullet
Uint32 bulletkey = SDL_MapRGB(bullet->format, 0xFF, 0, 0xFF );
SDL_SetColorKey( bullet, SDL_SRCCOLORKEY, bulletkey );

//cocaine plant
Uint32 cokekey = SDL_MapRGB(cokeplant->format, 0xFF, 0, 0xFF );
SDL_SetColorKey( cokeplant, SDL_SRCCOLORKEY, cokekey );

//note
Uint32 notekey = SDL_MapRGB(note->format, 0xFF, 0, 0xFF );
SDL_SetColorKey( note, SDL_SRCCOLORKEY, notekey );

//BIG note
Uint32 bnotekey = SDL_MapRGB(bignote->format, 0xFF, 0, 0xFF );
SDL_SetColorKey( bignote, SDL_SRCCOLORKEY, bnotekey );

//Helicopter body
Uint32 qwertydirkey = SDL_MapRGB(qwertydir->format, 0xFF, 0, 0xFF );
SDL_SetColorKey( qwertydir, SDL_SRCCOLORKEY, qwertydirkey );

//Helicopter body
Uint32 helibodykey = SDL_MapRGB(helibody->format, 0xFF, 0, 0xFF );
SDL_SetColorKey( helibody, SDL_SRCCOLORKEY, helibodykey );

//Helicopter Blade
Uint32 helibladekey = SDL_MapRGB(heliblade->format, 0xFF, 0, 0xFF );
SDL_SetColorKey( heliblade, SDL_SRCCOLORKEY, helibladekey );
///////////////////////////
//		Music			//
/////////////////////////

int audio_rate = 22050;
  Uint16 audio_format = AUDIO_S16; /* 16-bit stereo */
  int audio_channels = 2;
  int audio_buffers = 4096;

  SDL_Init(SDL_INIT_VIDEO | SDL_INIT_AUDIO);
	if(Mix_OpenAudio(audio_rate, audio_format, audio_channels, audio_buffers)) {printf("Unable to open audio!\n");}
  int chan = 0;
	Mix_Chunk *gun = Mix_LoadWAV("data/sound/gun.wav");
	Mix_Chunk *ampersand1 = Mix_LoadWAV("data/sound/voice/Ampersand1.wav");
	Mix_Chunk *ampersand2 = Mix_LoadWAV("data/sound/voice/Ampersand2.wav");
	Mix_Chunk *ampersand3 = Mix_LoadWAV("data/sound/voice/Ampersand3.wav");
	Mix_Chunk *ampersand4 = Mix_LoadWAV("data/sound/voice/Ampersand4.wav");
	Mix_Chunk *ampersand5 = Mix_LoadWAV("data/sound/voice/Ampersand5.wav");
	Mix_Chunk *ampersand6 = Mix_LoadWAV("data/sound/voice/Ampersand6.wav");
	Mix_Chunk *ampersand7 = Mix_LoadWAV("data/sound/voice/Ampersand7.wav");
	Mix_Chunk *ampersand8 = Mix_LoadWAV("data/sound/voice/Ampersand8.wav");
	Mix_Chunk *ampersand9 = Mix_LoadWAV("data/sound/voice/Ampersand9.wav");
	Mix_Chunk *ampersand10 = Mix_LoadWAV("data/sound/voice/Ampersand10.wav");
	Mix_Chunk *ampersand11 = Mix_LoadWAV("data/sound/voice/Ampersand11.wav");
	Mix_Chunk *ampersand12 = Mix_LoadWAV("data/sound/voice/Ampersand12.wav");
	Mix_Chunk *ampersand13 = Mix_LoadWAV("data/sound/voice/Ampersand13.wav");
	Mix_Chunk *ampersand14 = Mix_LoadWAV("data/sound/voice/Ampersand14.wav");
	Mix_Chunk *ampersand15 = Mix_LoadWAV("data/sound/voice/Ampersand15.wav");
	Mix_Chunk *ampersand16 = Mix_LoadWAV("data/sound/voice/Ampersand16.wav");
	Mix_Chunk *ampersand17 = Mix_LoadWAV("data/sound/voice/Ampersand17.wav");
	Mix_Chunk *ampersand18 = Mix_LoadWAV("data/sound/voice/Ampersand18.wav");
	Mix_Chunk *ampersand19 = Mix_LoadWAV("data/sound/voice/Ampersand19.wav");
	Mix_Chunk *ampersand20 = Mix_LoadWAV("data/sound/voice/Ampersand20.wav");
	Mix_Chunk *ampersand21 = Mix_LoadWAV("data/sound/voice/Ampersand21.wav");
	Mix_Chunk *ampersand22 = Mix_LoadWAV("data/sound/voice/Ampersand22.wav");
	Mix_Chunk *ampersand23 = Mix_LoadWAV("data/sound/voice/Ampersand23.wav");
	Mix_Chunk *qwerty1 = Mix_LoadWAV("data/sound/voice/qwerty1.wav");
	Mix_Chunk *qwerty2 = Mix_LoadWAV("data/sound/voice/qwerty2.wav");
	Mix_Chunk *qwerty3 = Mix_LoadWAV("data/sound/voice/qwerty3.wav");
	Mix_Chunk *qwerty4 = Mix_LoadWAV("data/sound/voice/qwerty4.wav");
	Mix_Chunk *qwerty5 = Mix_LoadWAV("data/sound/voice/qwerty5.wav");
	Mix_Chunk *qwerty6 = Mix_LoadWAV("data/sound/voice/qwerty6.wav");
	Mix_Chunk *qwerty7 = Mix_LoadWAV("data/sound/voice/qwerty7.wav");
	Mix_Chunk *qwerty8 = Mix_LoadWAV("data/sound/voice/qwerty8.wav");
	Mix_Chunk *qwerty9 = Mix_LoadWAV("data/sound/voice/qwerty9.wav");
	Mix_Chunk *comma1 = Mix_LoadWAV("data/sound/voice/comma1.wav");
	Mix_Chunk *comma2 = Mix_LoadWAV("data/sound/voice/comma2.wav");
	Mix_Chunk *comma3 = Mix_LoadWAV("data/sound/voice/comma3.wav");
	Mix_Chunk *comma4 = Mix_LoadWAV("data/sound/voice/comma4.wav");
	Mix_Chunk *comma5 = Mix_LoadWAV("data/sound/voice/comma5.wav");
	Mix_Chunk *comma6 = Mix_LoadWAV("data/sound/voice/comma6.wav");
	Mix_Chunk *comma7 = Mix_LoadWAV("data/sound/voice/comma7.wav");
	Mix_Chunk *comma8 = Mix_LoadWAV("data/sound/voice/comma8.wav");
	Mix_Chunk *comma9 = Mix_LoadWAV("data/sound/voice/comma9.wav");
	Mix_Chunk *comma10 = Mix_LoadWAV("data/sound/voice/comma10.wav");
	Mix_Chunk *comma11= Mix_LoadWAV("data/sound/voice/comma11.wav");
	Mix_Chunk *comma12 = Mix_LoadWAV("data/sound/voice/comma12.wav");
	Mix_Chunk *comma13 = Mix_LoadWAV("data/sound/voice/comma13.wav");
	Mix_Chunk *NULL1 = Mix_LoadWAV("data/sound/voice/NULL1.wav");
	Mix_Chunk *seven1 = Mix_LoadWAV("data/sound/voice/seven1.wav");
	Mix_Chunk *seven2 = Mix_LoadWAV("data/sound/voice/seven2.wav");
	Mix_Chunk *seven3 = Mix_LoadWAV("data/sound/voice/seven3.wav");
	Mix_Chunk *seven4 = Mix_LoadWAV("data/sound/voice/seven4.wav");
///////////////////////////
//		Variables		//
/////////////////////////
	int devmove = 1; //1 = w,a,s,d move through landscape quickly
	int devquest = 0;//1 = no quests or storyline
	int devinfo = 1;//1 = press "p" or "o" for output
//Quest
	int quest = 30;
	int quest17 = 0;
//Screen
	int resX = 1024;//Screen
	int resY = 768; //Resolution
//Math
	const double PI = 3.14159265;
	double prAngle;
	double r = 0;
//Mouse
	double mousex = 0;
	double mousey = 0;
	int mousepx = 0;
	int mousepy = 0;
//Camera
	double camerax = 185;
	double cameray = 140;
	double doorenterx;
	double doorentery;
	double ospeed = 0.05;//0.015625;
	double speed = ospeed;
//Other
	int randdir = 1;
	int phide = 0;
	int nticks = 0;
//Map Tile Dimentions
	int tilerow = 14;
	int tilecollom = 11;
	int tilepixles = 64; //the width and height of each tile
//World Map 
	const int worldwidth = 200;
	const int worldheight = 200;
	int worldarray [worldwidth][worldheight];
//Tiler Locations
	SDL_Rect tilel;
	SDL_Rect tileI;
	SDL_Rect tileI2;
	tilel.x = 1;
	tilel.y = 1;
	tileI.x = 1;
	tileI.y = 1;
	tileI2.x = 1;
	tileI2.y = 1;
//Player Location
	SDL_Rect playerl; 
	playerl.x = ((tilerow-1)*tilepixles)/2;
	playerl.y = ((tilecollom-1)*tilepixles)/2;
	int curdir = 0; //CURRENT DIRECTION MOVING: 1=UP 2=DOWN 3=LEFT 4=RIGHT
//Player Bullet
	const int bnum = 5;
	int pshot[bnum], bhx[bnum], bhy[bnum];
	double bAngle[bnum], brax[bnum], bray[bnum];
	SDL_Rect pbullet[bnum];
	for (int bi=0; bi<=bnum; bi++){
		pbullet[bi].x = playerl.x;
		pbullet[bi].y = playerl.y;
		pshot[bi] = 0;
		bhx[bi] = 0;
		bhy[bi] = 0;
		brax[bi] = 0;
		bray[bi] = 0;
		bAngle[bi] = 0;
	}
	int bf = 0;
	int pbticks = SDL_GetTicks();
	int bspeed = 50;
	int gunh = 1;

//Characters
	SDL_Rect qwertypos;
		qwertypos.x = 0;
		qwertypos.y = 0;
	SDL_Rect sevenpos;
		sevenpos.x = 0;
		sevenpos.y = 0;
	SDL_Rect commapos;
		commapos.x = 77;
		commapos.y = 65;
	SDL_Rect altpos;
		altpos.x = 0;
		altpos.y = 0;
	SDL_Rect f4pos;
		f4pos.x = 0;
		f4pos.y = 0;
	//NULL = ENEMY4
//Note
	SDL_Rect notepos;
		notepos.x = 0;
		notepos.y = 0;
	SDL_Rect notempos;
		notempos.x = 0;
		notempos.y = 0;
//Coke Plant (Item)
	SDL_Rect icoke; //LOL
		icoke.x = 0;
		icoke.y = 0;
//Helicopter
	SDL_Rect pheliblade;
		pheliblade.x = 0;
		pheliblade.y = 0;
	SDL_Rect phelibody;
		phelibody.x = 0;
		phelibody.y = 0;
	double spinning = 0;
//Enemy
	const int ennum = 10+1; //+1 for some random reason because C++ is stupid i think.
    int enemyalive[ennum], enemyX[ennum], enemyY[ennum], esp[ennum], eshot[ennum]; 
	int ehx[ennum], ehy[ennum], erax[ennum], eray[ennum], ebticks[ennum], emticks[ennum];
	int emove = 1;
	double moAngle[ennum], moCAngle[ennum], ebAngle[ennum];
	SDL_Rect enemypos[ennum]; 
	SDL_Rect enemympos[ennum];
	SDL_Rect ebullet[ennum];
	//X-Y - Position on Array
	//QUEST ENEMIES
	enemypos[1].x = 187;//(border guard)
	enemypos[1].y = 185;
	enemypos[2].x = 191;//(border guard)
	enemypos[2].y = 186;
	enemypos[3].x = 191;//(border guard)
	enemypos[3].y =	190;
	enemypos[4].x = 0;//NULL
	enemypos[4].y =	0;
	enemypos[5].x = 18;//Guard (Dock)
	enemypos[5].y =	42;
	enemypos[6].x = 20;//Guard (Dock)
	enemypos[6].y =	42;
	enemypos[7].x = 0;//SEVEN
	enemypos[7].y =	0;
	enemypos[8].x = 0;//Seven Guard
	enemypos[8].y =	0;
	enemypos[9].x = 0;//Seven Guard
	enemypos[9].y =	0;
	enemypos[10].x = 0;//Seven Guard
	enemypos[10].y = 0;
	//RANDOM
	for (int iev=0; iev<=ennum; iev++){
		enemyalive[iev] = 1; // Alive
		enemympos[iev].x = 0;//Position
		enemympos[iev].y = 0;//	on Screen
		moAngle[iev]=0; //Enemy Angle
		moCAngle[iev]=0; //Enemy CheckAngle
		esp[iev] = 0; //Enemy sees player
		eshot[iev]=0; // enemy bullet shot
		ebullet[iev].x=0; //Enemy Bullet
		ebullet[iev].y=0; //postion on screen
		ebAngle[iev]=0; //enemy bullet angle
		ehx[iev] = 0;
		ehy[iev] = 0;
		erax[iev] = 0;
		eray[iev] = 0;
		ebticks[iev] = SDL_GetTicks();
		emticks[iev] = SDL_GetTicks();
	}

//GUI

	SDL_Rect zero;
	zero.x = 0;
	zero.y = 0;
	SDL_Rect guisidel;
	guisidel.x = 896;
	guisidel.y = 0;
	SDL_Rect guibottoml;
	guibottoml.x = 0;
	guibottoml.y = 704;

//Colision setup

	int hitx = camerax+(tilerow-0.5/2);
	int hity = cameray+(tilecollom-0.5/2);
	int tc = worldarray[hity][hitx];

///////////////////////////
//	Load Map from file	//
/////////////////////////

	std::ifstream mapfile("data/maps/world.txt");
	for (int r = 0; r < worldheight; r++){
		for (int t =0; t < worldwidth; t++){
		mapfile >> worldarray[r][t];
		}
	}

///////////////////////////
//		Message			//
/////////////////////////

	cout << "Project Guineapig" << endl;
	cout << "Copyright (c) 2008 Casey Yardley, Zac Pez, Adrian King" << endl;
	cout << "Project Website: http://www.garrettwademan.com/projectguineap/index.html" << endl;
	cout << endl;
	cout << "LICENCE:" << endl;
	cout << "PROJECT GUINEAPIG is copyrighted work."<< endl;
	cout << "You may download and share the software, but you may not sell, or modify it without permission from a copyright holder"<< endl;
	cout << "PROJECT GUINEAPIG uses the following libraries: ''Simple DirectMedia Layer'' (SDL), SDL_gfx and SDL_mixer"<< endl;
	cout << "SDL, SDL_gfx, SDL_tff and SDL_mixer are licenced under the Lesser GNU General Public Licence (LGPL)." << endl;
	cout << "Source code for SDL, SDL_mixer and SDL_ttf can be found at http://www.libsdl.org" <<endl;
	cout << "Source code for SDL_gfx can be found at http://www.ferzkopp.net/joomla/content/view/19/14/" << endl;
	cout << "The LGPL is included, or can be viewed here: http://www.gnu.org/licenses/lgpl.html"<< endl;
	system("Pause");
///////////////////////////////////////////////////////////////
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//++++++	M	A	I	N			L	O	O	P	+++++++++//
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
///////////////////////////////////////////////////////////////
	SDL_WM_SetCaption( "Project Guineapig", NULL );
	screen = SDL_SetVideoMode(resX, resY, 32, SDL_FULLSCREEN); //Define Screen; Resultion = 1024x768
	do{
		int startTicks = SDL_GetTicks(); 
//Apply Background
		SDL_BlitSurface(BG, 0, screen, &zero);
///////////////////////////
//		SPEED			//
//////////////////////////
		if (worldarray[hity][hitx]==16 || worldarray[hity][hitx]==17){
			speed=ospeed*2;
		}else{
			speed=ospeed;
		}
///////////////////////////
//     Draw Stuff		//
//////////////////////////
	//Draw Map
		for (int layY = cameray; layY < cameray+tilecollom; layY++){
			tilel.y = (layY*tilepixles) - (cameray*tilepixles);
			tileI.y = (layY*tilepixles) - (cameray*tilepixles)+16;
			tileI2.y = (layY*tilepixles) - (cameray*tilepixles);
			for (int layX = camerax; layX <camerax+tilerow; layX++){
				tilel.x = (layX*tilepixles) - (camerax*tilepixles);
				tileI.x = (layX*tilepixles) - (camerax*tilepixles);
				tileI2.x = (layX*tilepixles) - (camerax*tilepixles)+32;
				if (worldarray[layY][layX] == 1){ 
					SDL_BlitSurface(mountain, 0, screen, &tilel);
				}
				if (worldarray[layY][layX] == 2){
					SDL_BlitSurface(forest, 0, screen, &tilel);
				}
				if (worldarray[layY][layX] == 3){
					SDL_BlitSurface(grass, 0, screen, &tilel);
				}
				if (worldarray[layY][layX] == 4){
					SDL_BlitSurface(cocaine, 0, screen, &tilel);
					SDL_BlitSurface(cokeplant, 0, screen, &tileI);
					SDL_BlitSurface(cokeplant, 0, screen, &tileI2);
				}
				if (worldarray[layY][layX] == 5){
					SDL_BlitSurface(blacktile, 0, screen, &tilel);
				}
////////////////TILES 5-10////////////////
				if (worldarray[layY][layX] == 11){
					SDL_BlitSurface(longgrass, 0, screen, &tilel);
				}
				if (worldarray[layY][layX] == 12){
					SDL_BlitSurface(sand, 0, screen, &tilel);
				}
				if (worldarray[layY][layX] == 13){
					SDL_BlitSurface(pebels, 0, screen, &tilel);
				}
				if (worldarray[layY][layX] == 14){
					SDL_BlitSurface(lake, 0, screen, &tilel);
				}
				if (worldarray[layY][layX] == 15){
					SDL_BlitSurface(ocean, 0, screen, &tilel);
				}
				if (worldarray[layY][layX] == 16){
					SDL_BlitSurface(path, 0, screen, &tilel);
				}
				if (worldarray[layY][layX] == 17){
					SDL_BlitSurface(path2, 0, screen, &tilel);
				}
				if (worldarray[layY][layX] == 18){
					SDL_BlitSurface(housefloor, 0, screen, &tilel);
				}
				if (worldarray[layY][layX] == 19){
					SDL_BlitSurface(cavefloor, 0, screen, &tilel);
				}
				if (worldarray[layY][layX] == 20){
					SDL_BlitSurface(concrete, 0, screen, &tilel);
				}
				if (worldarray[layY][layX] == 21){
					SDL_BlitSurface(fence_vert, 0, screen, &tilel);
				}
				if (worldarray[layY][layX] == 22){
					SDL_BlitSurface(fence_horz, 0, screen, &tilel);
				}
				if (worldarray[layY][layX] == 23){
					SDL_BlitSurface(fence_topleft, 0, screen, &tilel);
				}
				if (worldarray[layY][layX] == 24){
					SDL_BlitSurface(fence_topright, 0, screen, &tilel);
				}
				if (worldarray[layY][layX] == 25){
					SDL_BlitSurface(fence_bottomleft, 0, screen, &tilel);
				}
				if (worldarray[layY][layX] == 26){
					SDL_BlitSurface(fence_bottomright, 0, screen, &tilel);
				}
				if (worldarray[layY][layX] == 27){
					SDL_BlitSurface(verticalsection_tinroof, 0, screen, &tilel);
				}
				if (worldarray[layY][layX] == 28){
					SDL_BlitSurface(horizontalsection_tinroof, 0, screen, &tilel);
				}
				if (worldarray[layY][layX] == 29){
					SDL_BlitSurface(bottomright_tinroof, 0, screen, &tilel);
				}
				if (worldarray[layY][layX] == 30){
					SDL_BlitSurface(bottomleft_tinroof, 0, screen, &tilel);
				}
				if (worldarray[layY][layX] == 31){
					SDL_BlitSurface(topleft_tinroof, 0, screen, &tilel);
				}
				if (worldarray[layY][layX] == 32){
					SDL_BlitSurface(topright_tinroof, 0, screen, &tilel);
				}
				if (worldarray[layY][layX] == 33){
					SDL_BlitSurface(top_tinroof, 0, screen, &tilel);
				}
				if (worldarray[layY][layX] == 34){
					SDL_BlitSurface(left_tinroof, 0, screen, &tilel);
				}	
			}
		}

//Draw Player

		playerl.x = ((tilerow-1)*tilepixles)/2;
		playerl.y = ((tilecollom-1)*tilepixles)/2;
		double prAngle = ((asin((playerl.x-mousex)/(pow((pow((playerl.x - mousex),2)+pow((playerl.y-mousey),2)),0.5))))*180)/PI;
		if (mousey >= playerl.y){prAngle = -prAngle+180;}
		SDL_Surface* playerRotated = rotozoomSurface(player, prAngle, 1, 0);
		//if (phide == 0){
			SDL_BlitSurface(playerRotated, 0, screen, &playerl);
		//}

	//Draw qwerty
		SDL_Rect qwertympos;
		qwertympos.x = (qwertypos.x*tilepixles) - (camerax*tilepixles);
		qwertympos.y = (qwertypos.y*tilepixles) - (cameray*tilepixles);
		SDL_BlitSurface(qwertybody, 0, screen, &qwertympos);

	//Draw seven
		SDL_Rect sevenmpos;
		sevenmpos.x = (sevenpos.x*tilepixles) - (camerax*tilepixles);
		sevenmpos.y = (sevenpos.y*tilepixles) - (cameray*tilepixles);
		SDL_BlitSurface(sevenbody, 0, screen, &sevenmpos);

	//Draw comma
		if (quest >10){
			SDL_Rect commampos;
			commampos.x = (commapos.x*tilepixles) - (camerax*tilepixles);
			commampos.y = (commapos.y*tilepixles) - (cameray*tilepixles);
			SDL_BlitSurface(commabody, 0, screen, &commampos);
		}
		if (quest >21){
		//Draw ALT
			SDL_Rect altmpos;
			altmpos.x = (altpos.x*tilepixles) - (camerax*tilepixles);
			altmpos.y = (altpos.y*tilepixles) - (cameray*tilepixles);
			SDL_BlitSurface(altbody, 0, screen, &altmpos);
		//Draw F4
			SDL_Rect f4mpos;
			f4mpos.x = (f4pos.x*tilepixles) - (camerax*tilepixles);
			f4mpos.y = (f4pos.y*tilepixles) - (cameray*tilepixles);
			SDL_BlitSurface(f4body, 0, screen, &f4mpos);
		}
	//NULL = ENEMY[4]

	//Draw Note

		notempos.x = (notepos.x*tilepixles) - (camerax*tilepixles);
		notempos.y = (notepos.y*tilepixles) - (cameray*tilepixles);
		SDL_BlitSurface(note, 0, screen, &notempos);

	//Draw Coke (Item)
		SDL_Rect imcoke;
		imcoke.x = (icoke.x*tilepixles) - (camerax*tilepixles);
		imcoke.y = (icoke.y*tilepixles) - (cameray*tilepixles);
		SDL_BlitSurface(cokeplant, 0, screen, &imcoke);

	//Draw Helicopter
		if (quest >31){
			SDL_Rect helimbody;
			helimbody.x = (phelibody.x*tilepixles) - (camerax*tilepixles);
			helimbody.y = (phelibody.y*tilepixles) - (cameray*tilepixles);
			SDL_BlitSurface(helibody, 0, screen, &helimbody);

			SDL_Rect helimblade;
			helimblade.x = (pheliblade.x*tilepixles) - (camerax*tilepixles);
			helimblade.y = (pheliblade.y*tilepixles) - (cameray*tilepixles);;
			SDL_BlitSurface(heliblade, 0, screen, &helimblade);
		}
	//Draw GUI

		SDL_BlitSurface(guiside, 0, screen, &guisidel);
		SDL_BlitSurface(guibottom, 0, screen, &guibottoml);
///////////////////////////
//		Quests			//
//////////////////////////
		if (devquest ==0){
			if (quest == 0){ //Start Game
				tilel.x = 0;
				tilel.y = 0;
				SDL_BlitSurface(intro, 0, screen, &tilel);
				SDL_UpdateRect(screen, 0, 0, resX, resY);
				chan = Mix_PlayChannel(-1, ampersand1, 0);
				do{}while (Mix_Playing(chan) !=0);
				camerax = 186;
				cameray = 189;
				quest = 1;
				emove = 0;
				gunh = 0;
			}
			if (quest == 2){ //Get Note
				emove = 1;
				if (notempos.x > playerl.x && notempos.x < playerl.x + 64 && notempos.y > playerl.y && notempos.y < playerl.y +64){		
					tilel.x = 0;
					tilel.y = 0;
					SDL_BlitSurface(bignote, 0, screen, &tilel);
					SDL_UpdateRect(screen, 0, 0, resX, resY);
					nticks = SDL_GetTicks();
					do{}while(SDL_GetTicks() - nticks > 3000);
					chan = Mix_PlayChannel(-1, ampersand2, 0);
					do{}while (Mix_Playing(chan) !=0);
					notepos.x = 0;
					notepos.y = 0;
					quest =3;
				}
			}
			if (quest ==4){
				SDL_UpdateRect(screen, 0, 0, resX, resY);
				chan = Mix_PlayChannel(-1, qwerty1, 0);
				do{}while (Mix_Playing(chan) !=0);
				chan = Mix_PlayChannel(-1, ampersand3, 0);
				do{}while (Mix_Playing(chan) !=0);
				chan = Mix_PlayChannel(-1, qwerty2, 0);
				do{}while (Mix_Playing(chan) !=0);
				chan = Mix_PlayChannel(-1, ampersand4, 0);
				do{}while (Mix_Playing(chan) !=0);
				chan = Mix_PlayChannel(-1, qwerty3, 0);
				do{}while (Mix_Playing(chan) !=0);
				chan = Mix_PlayChannel(-1, ampersand5, 0);
				do{}while (Mix_Playing(chan) !=0);
				chan = Mix_PlayChannel(-1, qwerty4, 0);
				do{}while (Mix_Playing(chan) !=0);
				chan = Mix_PlayChannel(-1, ampersand6, 0);
				do{}while (Mix_Playing(chan) !=0);
				chan = Mix_PlayChannel(-1, qwerty5, 0);
				do{}while (Mix_Playing(chan) !=0);
				chan = Mix_PlayChannel(-1, ampersand7, 0);
				do{}while (Mix_Playing(chan) !=0);
				chan = Mix_PlayChannel(-1, qwerty6, 0);
				do{}while (Mix_Playing(chan) !=0);
				chan = Mix_PlayChannel(-1, ampersand8, 0);
				do{}while (Mix_Playing(chan) !=0);
				tilel.x = 0;
				tilel.y = 0;
				SDL_BlitSurface(qwertydir, 0, screen, &tilel);
				SDL_UpdateRect(screen, 0, 0, resX, resY); //Show Direction
				nticks = SDL_GetTicks(); 
				do{}while(SDL_GetTicks() - nticks > 5000);
				chan = Mix_PlayChannel(-1, ampersand9, 0);
				do{}while (Mix_Playing(chan) !=0);
				gunh = 1;
				quest = 5;
			}
			if(quest==6){//Talk to NULL
				SDL_UpdateRect(screen, 0, 0, resX, resY);
				chan = Mix_PlayChannel(-1, NULL1, 0);
				do{}while (Mix_Playing(chan) !=0);
				chan = Mix_PlayChannel(-1, ampersand10, 0);
				do{}while (Mix_Playing(chan) !=0);
				quest=7;
			}
			if(quest==8){//Get Coke
				if (imcoke.x > playerl.x && imcoke.x < playerl.x + 64 && imcoke.y > playerl.y && imcoke.y < playerl.y +64){		
					icoke.x = 0;
					icoke.y = 0;
					quest = 9;
				}
			}
			if(quest==10){//Talk to qwerty again
				SDL_UpdateRect(screen, 0, 0, resX, resY);
				chan = Mix_PlayChannel(-1, qwerty7, 0);
				do{}while (Mix_Playing(chan) !=0);
				chan = Mix_PlayChannel(-1, qwerty8, 0);
				do{}while (Mix_Playing(chan) !=0);
				chan = Mix_PlayChannel(-1, ampersand11, 0);
				do{}while (Mix_Playing(chan) !=0);
				chan = Mix_PlayChannel(-1, qwerty9, 0);
				do{}while (Mix_Playing(chan) !=0);
				quest = 11;
			}
			if(quest==11){//Find Comma
				commapos.x = 77;
				commapos.y = 65;
				if (hitx == 75 && hity ==65){
					quest = 12;
				}
			}
			if (quest==12){//Talk to Comma
				SDL_UpdateRect(screen, 0, 0, resX, resY);
				chan = Mix_PlayChannel(-1, comma1, 0);
				do{}while (Mix_Playing(chan) !=0);
				chan = Mix_PlayChannel(-1, ampersand12, 0);
				do{}while (Mix_Playing(chan) !=0);
				chan = Mix_PlayChannel(-1, comma2, 0);
				do{}while (Mix_Playing(chan) !=0);
				chan = Mix_PlayChannel(-1, ampersand13, 0);
				do{}while (Mix_Playing(chan) !=0);
				chan = Mix_PlayChannel(-1, comma3, 0);
				do{}while (Mix_Playing(chan) !=0);
				quest = 13;
			}
			if (quest==14){//Give qwerty the coke from comma
				//Should put sound here probally
				quest = 15;
			}
			if (quest==15){//Goto Comma again
				if (hitx == 75 && hity ==65){
					quest = 16;
				}
			}
			if (quest==16){//Talk to Comma again
				SDL_UpdateRect(screen, 0, 0, resX, resY);
				chan = Mix_PlayChannel(-1, comma4, 0);
				do{}while (Mix_Playing(chan) !=0);
				chan = Mix_PlayChannel(-1, comma5, 0);
				do{}while (Mix_Playing(chan) !=0);
				chan = Mix_PlayChannel(-1, ampersand14, 0);
				do{}while (Mix_Playing(chan) !=0);
				quest = 17;
			}
			if (quest==17){//Dock Guards are Dead
				if (enemyalive[5]==0 && enemyalive[6]==0){
					quest = 18;
				}
			}
			if (quest==18){//Go see Comma AGAIN
				if (hitx == 75 && hity ==65){
					quest = 19;
				}
			}
			if (quest==19){//Talk to Comma AGAIN
				SDL_UpdateRect(screen, 0, 0, resX, resY);
				chan = Mix_PlayChannel(-1, comma6, 0);
				do{}while (Mix_Playing(chan) !=0);
				chan = Mix_PlayChannel(-1, comma7, 0);
				do{}while (Mix_Playing(chan) !=0);
				chan = Mix_PlayChannel(-1, ampersand15, 0);
				do{}while (Mix_Playing(chan) !=0);
				chan = Mix_PlayChannel(-1, comma8, 0);
				do{}while (Mix_Playing(chan) !=0);
				chan = Mix_PlayChannel(-1, ampersand16, 0);
				do{}while (Mix_Playing(chan) !=0);
				chan = Mix_PlayChannel(-1, comma9, 0);
				do{}while (Mix_Playing(chan) !=0);
				quest = 20;
			}
		}
		if (quest==22){
			if (hitx == 75 && hity ==65){//Go to Comma AGAIN2
					quest = 23;
				}
		}
		if (quest==23){//Talk to Comma AGAIN2
				SDL_UpdateRect(screen, 0, 0, resX, resY);
				chan = Mix_PlayChannel(-1, comma10, 0);
				do{}while (Mix_Playing(chan) !=0);
				chan = Mix_PlayChannel(-1, ampersand17, 0);
				do{}while (Mix_Playing(chan) !=0);
				chan = Mix_PlayChannel(-1, comma11, 0);
				do{}while (Mix_Playing(chan) !=0);
				chan = Mix_PlayChannel(-1, ampersand18, 0);
				do{}while (Mix_Playing(chan) !=0);
				chan = Mix_PlayChannel(-1, comma12, 0);
				do{}while (Mix_Playing(chan) !=0);
				chan = Mix_PlayChannel(-1, ampersand19, 0);
				do{}while (Mix_Playing(chan) !=0);
				altpos.x = 18;
				altpos.y = 29;
				f4pos.x = 20;
				f4pos.y = 29;
				enemypos[4].x = 0;
				enemypos[4].y = 0;
				enemypos[5].x = 0;
				enemypos[5].y = 0;
				quest=24;
		}
		if (quest==24){//Go see Alt+f4
				if (hitx == 19 && hity ==29){
					quest = 25;
				}
			}
		if (quest==25){
			if (hitx == 75 && hity ==65){//Go to Comma AGAIN3
					quest = 26;
				}
		}
		if (quest==26){//Talk to Comma AGAIN3
				SDL_BlitSurface(intro, 0, screen, &tilel);
				SDL_UpdateRect(screen, 0, 0, resX, resY);
				chan = Mix_PlayChannel(-1, comma13, 0);
				do{}while (Mix_Playing(chan) !=0);
				quest = 27;
		}
		if (quest==28){//Talk to Seven
				SDL_UpdateRect(screen, 0, 0, resX, resY);
				chan = Mix_PlayChannel(-1, seven1, 0);
				do{}while (Mix_Playing(chan) !=0);
				chan = Mix_PlayChannel(-1, ampersand20, 0);
				do{}while (Mix_Playing(chan) !=0);
				chan = Mix_PlayChannel(-1, seven2, 0);
				do{}while (Mix_Playing(chan) !=0);
				chan = Mix_PlayChannel(-1, ampersand21, 0);
				do{}while (Mix_Playing(chan) !=0);
				chan = Mix_PlayChannel(-1, seven3, 0);
				do{}while (Mix_Playing(chan) !=0);
				quest = 29;
		}
		if (quest ==31){//Leave this here
			quest = 32;
		}
		if (quest ==30){//Blow up factory
			if (hitx == 12 && hity ==80){
				enemyalive[7]=1;
				enemyalive[8]=1;
				enemyalive[9]=1;
				enemypos[7].x = 8;
				enemypos[7].y = 78;
				enemypos[8].x = 8;
				enemypos[8].y = 80;
				enemypos[9].x = 8;
				enemypos[9].y = 75;
				enemypos[10].x = 8;
				enemypos[10].y = 85;
				quest=31;
			}
		}
		if (quest == 32){//Get yelled at by seven
			SDL_UpdateRect(screen, 0, 0, resX, resY);
			chan = Mix_PlayChannel(-1, seven4, 0);
			do{}while (Mix_Playing(chan) !=0);
				phelibody.x = 8;
				phelibody.y = 39;
				pheliblade.x = 9;
				pheliblade.y = 39;
				quest =33;
			
		}
		if (quest == 33){//Go to hellecopter
			if(enemyalive[7]==0 && enemyalive[8]==0 && enemyalive[9]==0){
				if (hitx >= 8 && hitx <= 14 && hity >=39 && hity <=41){
					SDL_UpdateRect(screen, 0, 0, resX, resY);
					chan = Mix_PlayChannel(-1, ampersand22, 0);
					do{}while (Mix_Playing(chan) !=0);
					chan = Mix_PlayChannel(-1, ampersand23, 0);
					do{}while (Mix_Playing(chan) !=0);
					quest =34;
				}
			}
		}
		
cout << hitx << ", " << hity << endl;
///////////////////////////
//       Mouse			//
//////////////////////////
		SDL_GetMouseState(&mousepx, &mousepy);
		mousex = mousepx;
		mousey = mousepy;
///////////////////////////
//       Enemies		//
//////////////////////////
		srand((unsigned)time(NULL)); //Seed random
		int olddir = randdir;
		randdir = ((rand() % 4 - 1) + 1 + 1);
		for (int mve=0; mve<=ennum; mve++){
			if (enemypos[mve].x>0 && enemypos[mve].x<(worldwidth*tilepixles)&& enemypos[mve].y>0 && enemypos[mve].y<(worldheight*tilepixles)){
				enemympos[mve].x = (enemypos[mve].x*tilepixles) - (camerax*tilepixles);
				enemympos[mve].y = (enemypos[mve].y*tilepixles) - (cameray*tilepixles);
				if (enemyalive[mve] == 1){
					if (SDL_GetTicks() - emticks[mve] > 250){//How long inbetween shots. 1 second = 1000
						emticks[mve] = SDL_GetTicks();
						//int sr = ((rand() % 3 - 1) + 1 + 1);
						//if (sr == 1){do{randdir = ((rand() % 4 - 1) + 1 + 1);}while(olddir == randdir);} //Delay Movement
////Move
						if (emove == 1){
							if (randdir == 1){//Up
								if(worldarray[enemypos[mve].y-1][enemypos[mve].x] == 16 || worldarray[enemypos[mve].y-1][enemypos[mve].x] == 17 || worldarray[enemypos[mve].y-1][enemypos[mve].x] == 18 || worldarray[enemypos[mve].y-1][enemypos[mve].x] == 19 || worldarray[enemypos[mve].y-1][enemypos[mve].x] == 20){enemypos[mve].y -= 1;}}
							if (randdir == 2){//Down
								if(worldarray[enemypos[mve].y+1][enemypos[mve].x] == 16 || worldarray[enemypos[mve].y+1][enemypos[mve].x] == 17 || worldarray[enemypos[mve].y+1][enemypos[mve].x] == 18 || worldarray[enemypos[mve].y+1][enemypos[mve].x] == 19 || worldarray[enemypos[mve].y+1][enemypos[mve].x] == 20){enemypos[mve].y += 1;}}
							if (randdir == 3){//Left
								if(worldarray[enemypos[mve].y][enemypos[mve].x-1] == 16 || worldarray[enemypos[mve].y][enemypos[mve].x-1] == 17 || worldarray[enemypos[mve].y][enemypos[mve].x-1] == 18 || worldarray[enemypos[mve].y][enemypos[mve].x-1] == 19 || worldarray[enemypos[mve].y][enemypos[mve].x-1] == 20){enemypos[mve].x -= 1;}}
							if (randdir == 4){//Right
								if(worldarray[enemypos[mve].y][enemypos[mve].x+1] == 16 || worldarray[enemypos[mve].y][enemypos[mve].x+1] == 17 || worldarray[enemypos[mve].y][enemypos[mve].x+1] == 18 || worldarray[enemypos[mve].y][enemypos[mve].x+1] == 19 || worldarray[enemypos[mve].y][enemypos[mve].x+1] == 20){enemypos[mve].x += 1;}
							}
						}
					}
//Sight
					double mrx = enemympos[mve].x - playerl.x ;
					double mry = enemympos[mve].y - playerl.y ;
					moCAngle[mve] = ((asin((mrx)/(pow((pow((mrx),2)+pow((mry),2)),0.5))))*180)/PI;
					if (playerl.y >= enemympos[mve].y){moCAngle[mve] = -moCAngle[mve]+180;}
					if (phide == 0){
						if (/*90deg view*/moAngle[mve] >= moCAngle[mve]-45 && moAngle[mve] <= moCAngle[mve]+45){
							moAngle[mve] = moCAngle[mve];
							esp[mve] = 1;
						}else{
							esp[mve] = 0;
						//Enemies Look around
							switch((rand() % 4 - 1) + 1 + 1){
								case 1:
									moAngle[mve] +=5;
								break;
								case 2:
									moAngle[mve] -=5;
								break;
							}
						}
					}
//Draw

					if (mve == 4 || mve ==7){//Null or Seven
						if (mve == 4){//Null
							SDL_Surface* nullr = rotozoomSurface(nullbody, moAngle[mve], 1, 0);
							SDL_BlitSurface(nullr, 0, screen, &enemympos[mve]);
						}
						if (mve == 7){//Seven
							SDL_Surface* sevenr = rotozoomSurface(sevenbody, moAngle[mve], 1, 0);
							SDL_BlitSurface(sevenr, 0, screen, &enemympos[mve]);
						}
					}else{//Other Enemies
						SDL_Surface* enemyr = rotozoomSurface(enemy, moAngle[mve], 1, 0);
						SDL_BlitSurface(enemyr, 0, screen, &enemympos[mve]);
					}
				}else{
					SDL_BlitSurface(deadenemy, 0, screen, &enemympos[mve]);
				}
			}
		}
//Bullets
		for ( int ec=0; ec<=ennum; ec++){
			if (enemyalive[ec] == 1){
				if (SDL_GetTicks() - ebticks[ec] > 1000){//How long inbetween shots. 1 second = 1000
					if (esp[ec] == 1){
						if (eshot[ec] == 0){
							if(/*only see screen*/ enemympos[ec].x > 0 &&enemympos[ec].x < tilerow*tilepixles && enemympos[ec].y >0 && enemympos[ec].y < tilecollom*tilepixles){
								Mix_PlayChannel(-1, gun, 0);
								ebullet[ec].x = enemympos[ec].x+32;
								ebullet[ec].y = enemympos[ec].y+32;
								eshot[ec] = 1;
								double erx = playerl.x - ebullet[ec].x;
								double ery = playerl.y - ebullet[ec].y;
								ebAngle[ec] = (asin((erx)/(pow((pow((erx),2)+pow((ery),2)),0.5)))); //bullet angle
								if (enemympos[ec].y <= playerl.y){ebAngle[ec] = -ebAngle[ec]+PI;}
								erax[ec] = cos(ebAngle[ec]-(PI/2))*bspeed;
								eray[ec] = sin(ebAngle[ec]-(PI/2))*bspeed;
								ebticks[ec] = SDL_GetTicks(); 
							}
						}
					}
				}
//hit player
				if (ebullet[ec].x > playerl.x-32 && ebullet[ec].x < playerl.x + 64 && ebullet[ec].y > playerl.y-32 && ebullet[ec].y < playerl.y +64){
					eshot[ec] = 0;
					cout << "BOOM Headshot!" << endl;

				//QUEST 1
					if (quest == 1){
						quest = 2; 
						camerax = 3;
						cameray = 4;
						notepos.x = 8;
						notepos.y = 6;
						doorenterx = 178;
						doorentery = 131;
						int hworldheight = 19;
						int hworldwidth = 18;
						std::ifstream house4x8("data/maps/house4x8.txt");//4255
						for (int r = 0; r < hworldheight; r++){
							for (int t =0; t < hworldwidth; t++){
								house4x8 >> worldarray[r][t];
							}
						}
					}
				}
				ehx[ec] = camerax + (ebullet[ec].x/tilepixles);
				ehy[ec] = cameray + (ebullet[ec].y/tilepixles);
				if (worldarray[ehy[ec]][ehx[ec]] == 1 || ebullet[ec].x <=0 || ebullet[ec].y <=0 || ebullet[ec].x >=tilerow*tilepixles || ebullet[ec].y>=tilecollom*tilepixles){
					eshot[ec] = 0;
				}else{
					ebullet[ec].x +=erax[ec];
					ebullet[ec].y +=eray[ec];
					SDL_Surface* erbullet = rotozoomSurface(bullet, (ebAngle[ec]*180)/PI, 1, 0);
					SDL_BlitSurface(erbullet, 0, screen, &ebullet[ec]);
				}
			}
		}

///////////////////////////
//    SDL Events		//
//////////////////////////
		SDL_Event events;
		while ( SDL_PollEvent(&events) ) {
//Keys
			if (events.key.keysym.sym == SDLK_UP) {
						cameray -=speed;
						curdir = 1;
			}
			if (events.key.keysym.sym == SDLK_DOWN) {
						cameray +=speed;
						curdir = 2;
			}
			if (events.key.keysym.sym == SDLK_LEFT) {
						camerax -=speed;
						curdir = 3;
			}
			if (events.key.keysym.sym == SDLK_RIGHT) {
						camerax +=speed;
						curdir = 4;
			}
			if (events.key.keysym.sym == SDLK_ESCAPE) {
					exit(1);
			}
			if (events.type == SDL_QUIT){
					exit(0);
			}
//Dev Move
			if (devmove == 1){
				if (events.key.keysym.sym == SDLK_w){cameray -=1;}
				if (events.key.keysym.sym == SDLK_s){cameray +=1;}
				if (events.key.keysym.sym == SDLK_a){camerax -=1;}
				if (events.key.keysym.sym == SDLK_d){camerax +=1;}
			}
//Dev Info
			if (devinfo == 1){
				if (events.key.keysym.sym == SDLK_o){
					cout << "Camera Position on Array: " << camerax << "," << cameray << endl;
				}
				if (events.key.keysym.sym == SDLK_p){
					cout << "Player Position on Array: " << hitx << "," << hity << endl;
				}
			}
//Mouse
			if (gunh == 1){
				if( events.type == SDL_MOUSEBUTTONDOWN ) {
					if( events.button.button == SDL_BUTTON_LEFT ) {
						if (SDL_GetTicks() - pbticks > 500){//How long inbetween shots. 1 second = 1000
							if (bf <= bnum){
								bf +=1;
								Mix_PlayChannel(-1, gun, 0);
								pbullet[bf].x = playerl.x+16;
								pbullet[bf].y = playerl.y+16;
								pshot[bf] = 1;
								double brx = mousex - pbullet[bf].x;
								double bry = mousey - pbullet[bf].y;
								bAngle[bf] = (asin((brx)/(pow((pow((brx),2)+pow((bry),2)),0.5)))); //bullet angle (RADIANS)
								if (mousey >= playerl.y){bAngle[bf] = -bAngle[bf] +PI;}
								brax[bf] = cos(bAngle[bf]-(PI/2))*bspeed;				//sin calculates rise
								bray[bf] = sin(bAngle[bf]-(PI/2))*bspeed;				//cos calculates run
								pbticks = SDL_GetTicks(); 
							}
						}
					}
					if( events.button.button == SDL_BUTTON_RIGHT ) {
						bf = 0; //RELOAD GUN
					}
				}
			}
//Collisions
			hitx = camerax+((tilerow-0.5)/2);
			hity = cameray+((tilecollom-0.5)/2);
			tc = worldarray[hity][hitx];			
			if (tc == 1 || tc == 2|| tc == 5 || tc == 14 || tc == 15 || tc == 12 || tc == 13 || tc == 14 || tc == 15||tc == 21|| tc == 22|| tc == 23|| tc == 24|| tc == 25|| tc == 26|| tc == 27|| tc == 28|| tc == 29|| tc == 30|| tc == 31|| tc == 32|| tc == 33|| tc == 34){
				if (curdir==1){cameray+=speed;}//up
				if (curdir==2){cameray-=speed;}//down
				if (curdir==3){camerax+=speed;}//left
				if (curdir==4){camerax-=speed;}//right


				//////HIDE
				////if (events.key.keysym.sym == SDLK_RSHIFT) {
					//cout << ":D"<<endl;
					//phide = 1;
			}
				//}else{ phide = 0;}


//DOORS//

//ENTER HOUSE

		if (hitx == 184 && hity == 135 ){//qwerty's House
			int hworldheight = 19;
			int hworldwidth = 18;
			std::ifstream house4x8("data/maps/house4x8.txt");//4255
			for (int r = 0; r < hworldheight; r++){
				for (int t =0; t < hworldwidth; t++){
					house4x8 >> worldarray[r][t];
				}
			}
			doorenterx = camerax;
			doorentery = cameray;
			camerax = 3;
			cameray = 4;
		}
		if (hitx == 185 && hity == 146 ){//Warehouse
			int hworldheight = 19;
			int hworldwidth = 18;
			std::ifstream house4x8("data/maps/house4x8.txt");//4255
			for (int r = 0; r < hworldheight; r++){
				for (int t =0; t < hworldwidth; t++){
					house4x8 >> worldarray[r][t];
				}
			}
			doorenterx = camerax;
			doorentery = cameray;
			camerax = 3;
			cameray = 4;
			qwertypos.x = 8;//qwerty
			qwertypos.y = 6;
			if (quest == 3){
				quest = 4;
			}
			if (quest == 9){
				quest = 10;
			}
			if (quest==13){
				quest = 14;
			}
			if (quest == 27){//See Seven
				sevenpos.x = 10;//qwerty
				sevenpos.y = 6;
				quest = 28;
			}
		}
		if (hitx == 187 && hity == 141 ){//Null's House
			
			int hworldheight = 19;
			int hworldwidth = 18;
			std::ifstream house4x8("data/maps/house4x8.txt");//4255
			for (int r = 0; r < hworldheight; r++){
				for (int t =0; t < hworldwidth; t++){
					house4x8 >> worldarray[r][t];
				}
			}
			doorenterx = camerax;
			doorentery = cameray;
			camerax = 3;
			cameray = 4;
			if (quest == 5){
				quest = 6;
			}
			enemypos[4].x = 8;//Null
			enemypos[4].y = 6;
		}
		if (hitx == 166 && hity == 151 ){//Hideout
			int hworldheight = 19;
			int hworldwidth = 18;
			std::ifstream house4x8("data/maps/house4x8.txt");//4255
			for (int r = 0; r < hworldheight; r++){
				for (int t =0; t < hworldwidth; t++){
					house4x8 >> worldarray[r][t];
				}
			}
			doorenterx = camerax;
			doorentery = cameray;
			camerax = 3;
			cameray = 4;
			if (quest==20){//Drop off some coke
				quest = 21;
			}
			if (quest==28){//Report Seven to HQ
				quest = 29;
			}
		}
		if (hitx == 32 && hity == 119 ){//Cave
			int hworldheight = 19;
			int hworldwidth = 18;
			std::ifstream house4x8("data/maps/house4x8.txt");//4255
			for (int r = 0; r < hworldheight; r++){
				for (int t =0; t < hworldwidth; t++){
					house4x8 >> worldarray[r][t];
				}
			}
			doorenterx = camerax;
			doorentery = cameray;
			camerax = 3;
			cameray = 4;
			if (quest==21){//Hide rest of coke
				quest = 22;
			}
		}
//EXIT HOUSE
		if(tc == 5){
			qwertypos.x = 0;
			qwertypos.y = 0;
			sevenpos.x = 0;
			sevenpos.y = 0;
			commapos.x = 77;
			commapos.y = 65;
			enemypos[4].x = 0;//NULL
			enemypos[4].y = 0;
			int worldheight = 200;
			int worldwidth = 200;
			camerax = doorenterx;
			cameray = doorentery;
		}
	}	

///////////////////////////
//     Player Bullets	//
//////////////////////////
		for (int bm=1; bm<=bf; bm++){
			if (pshot[bm] == 1){
				for (int ken=1; ken<=ennum; ken++){
				//Bullet Hit
					if((pbullet[bm].x > enemympos[ken].x) && (pbullet[bm].y > enemympos[ken].y) && (pbullet[bm].x < (enemympos[ken].x + tilepixles)) && (pbullet[bm].y < (enemympos[ken].y + tilepixles))){
						pshot[bm] = 0;
						enemyalive[ken] = 0;
						if (quest == 7 && ken == 4){//NULL is Dead
							icoke.x = enemypos[ken].x;
							icoke.y = enemypos[ken].y;
							quest = 8;
						}
					}
				}
				bhx[bm] = camerax + (pbullet[bm].x/tilepixles);
				bhy[bm] = cameray + (pbullet[bm].y/tilepixles);
				if (worldarray[bhy[bm]][bhx[bm]] == 1 || pbullet[bm].x <=0 || pbullet[bm].y <=0 || pbullet[bm].x >=worldwidth*tilepixles || pbullet[bm].y>=worldheight*tilepixles){
					pshot[bm] = 0;
				}else{
					pbullet[bm].x +=brax[bm];
					pbullet[bm].y +=bray[bm];
					SDL_Surface* rbullet = rotozoomSurface(bullet, ((bAngle[bm]*180)/PI)+90, 1, 0);
					SDL_BlitSurface(rbullet, 0, screen, &pbullet[bm]);
				}
			}
		}
/////////////////////////////
//		Draw Screen		  //
////////////////////////////
		SDL_UpdateRect(screen, 0, 0, resX, resY);
///////////////////////////
//		Framerate		//
//////////////////////////
		if ((SDL_GetTicks() - startTicks) < 1000 / FRAMES_PER_SECOND ){
			SDL_Delay( ( 1000 / FRAMES_PER_SECOND ) - (SDL_GetTicks() - startTicks) );
		}
	}while (true);
	return 0;
};
