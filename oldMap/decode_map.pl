#! C:/strawberry/perl/bin/perl

open FILE, "world.txt" or die $!;

$newData = "[";

$x = 0;
$y = 0;

for ($x = 0; $x < 200; $x++) {
	$newData .= "[";
	for ($y = 0; $y < 200; $y++) {
		$line = <FILE>;
		chomp($line);
		$newData .= $line;
		if ($y != 199){
			$newData .= ", ";
		} else {
			$newData .= " ";
		}
	}
	if ($x != 199){
	$newData .= "],\n";
	} else {
		$newData .= "]\n";
	}
}
$newData .= "]";

open FILE2, ">newworld.txt" or die $!;
print FILE2 $newData;

close FILE;
close FILE2;