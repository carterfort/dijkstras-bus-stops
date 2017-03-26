<?php

if ( ! function_exists('dd') ){
	function dd(){
		array_map(function ($x) {
            dump($x);
        }, func_get_args());

        die(1);
	}
}

if ( ! function_exists('mix')){
	function mix($filename){

		if ( ! substr_startswith($filename, '/')) $filename = '/'.$filename;

		$manifestUrl = __DIR__ . "/../public/mix-manifest.json";
		if (file_exists($manifestUrl)){
			$json = file_get_contents($manifestUrl);
			$manifest = json_decode($json, true);
			if ($manifest){
				return $manifest[$filename];
			}
		}

	}
}

if ( ! function_exists('substr_startswith')){

	function substr_startswith($haystack, $needle) {
	    return substr($haystack, 0, strlen($needle)) === $needle;
	}

}

if ( ! function_exists('preg_match_startswith')){

	function preg_match_startswith($haystack, $needle) {
	    return preg_match('~' . preg_quote($needle, '~') . '~A', $haystack) > 0;
	}

}

if ( ! function_exists('substr_compare_startswith')){

	function substr_compare_startswith($haystack, $needle) {
	    return substr_compare($haystack, $needle, 0, strlen($needle)) === 0;
	}

}

if ( ! function_exists('strpos_startswith')){

	function strpos_startswith($haystack, $needle) {
	    return strpos($haystack, $needle) === 0;
	}

}

if ( ! function_exists('strncmp_startswith')){

	function strncmp_startswith($haystack, $needle) {
	    return strncmp($haystack, $needle, strlen($needle)) === 0;
	}

}

if ( ! function_exists('strncmp_startswith2')){

	function strncmp_startswith2($haystack, $needle) {
	    return $haystack[0] === $needle[0] ? strncmp($haystack, $needle, strlen($needle)) === 0
        : false;
    }   
}