<?php

namespace App\Console;

use Illuminate\Support\Facades\DB;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Modules\APIIntegrations\App\Models\WHODrugInformation;
use GuzzleHttp\Client;
use GuzzleHttp\Promise;

class Kernel extends ConsoleKernel
{

    public function getWHODrugAPIConfigurations($environment)
    {
        if ($environment == 'production') {
            $whodrugapi_configs = DB::table('tra_whodrugproductionapi_configurations')->first();
        } else {
            $whodrugapi_configs = DB::table('tra_whodrugapi_configurations')->first();
        }
        return $whodrugapi_configs;

    }
    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // $schedule->command('inspire')->hourly();
        $schedule->call(function () {
            print ('====================STARTING SYNC===========================');
            $environment = 'production';
            $whodrugapi_configs = $this->getWHODrugAPIConfigurations($environment);
            $queryParams = http_build_query([
                'MedProdLevel' => 2,
                'IncludeAtc' => 'true',
                'IngredientTranslations' => 'false'
            ]);

            $headers = [
                'umc-license-key' => $whodrugapi_configs->license_key,
                'Cache-Control' => 'no-cache',
                'umc-client-key' => $whodrugapi_configs->client_key,
            ];

            // Send an asynchronous request using Guzzle promises
            // Create a new Guzzle HTTP client
            $client = new Client();
            $promise = $client->getAsync($whodrugapi_configs->request_url . '?' . $queryParams, [
                'headers' => $headers,
            ]);

            // Handle the promise
            $promise->then(
                function ($response) {
                    // Handle the response
                    $responseBody = $response->getBody()->getContents();
                    $file = 'whodrugdata.json';
                    file_put_contents($file, $responseBody);
                    print ('====================HANDLE RESPONSE===========================');
                },
                function ($reason) {
                    // Handle promise rejection (e.g., if request fails)
                    $res = [
                        'success' => false,
                        'message' => 'Request error: ' . $reason,
                    ];
                    echo json_encode($res);
                }
            );

            // Handle the response
            // if ($response) {
            //     $decodedResponse = json_decode($response, true);
            //     if ($decodedResponse) {
            //         // Flatten the array structure
            //         $flattenedDrugs = [];

            //         foreach ($decodedResponse as $drug) {
            //             $activeIngredients = array_map(function ($active) {
            //                 return $active['ingredient'];
            //             }, $drug['activeIngredients']);

            //             // Concatenate activeIngredients with commas and "and" for the last one
            //             $concatenatedIngredients = implode(', ', array_slice($activeIngredients, 0, -1));
            //             if (count($activeIngredients) > 1) {
            //                 $concatenatedIngredients .= ' and ' . end($activeIngredients);
            //             } else {
            //                 $concatenatedIngredients = reset($activeIngredients);
            //             }

            //             // Handle countryOfSales and maHolders
            //             if (!empty ($drug['countryOfSales'])) {
            //                 foreach ($drug['countryOfSales'] as $country) {
            //                     $countryCode = $country['iso3Code'];
            //                     if (!empty ($country['maHolders'])) {
            //                         foreach ($country['maHolders'] as $maHolder) {
            //                             $flattenedDrug = [
            //                                 'drugName' => $drug['drugName'],
            //                                 'drugCode' => $drug['drugCode'],
            //                                 'medicinalProductID' => $drug['medicinalProductID'],
            //                                 'isGeneric' => $drug['isGeneric'],
            //                                 'isPreferred' => $drug['isPreferred'],
            //                                 'countryOfSales' => $countryCode,
            //                                 'activeIngredients' => $concatenatedIngredients,
            //                                 'atc_code' => null,
            //                                 'atc_text' => null,
            //                                 'atc_official_flag' => null,
            //                                 'maHolder_name' => $maHolder['name'],
            //                                 'maHolder_medicinalProductID' => $maHolder['medicinalProductID'],
            //                             ];

            //                             // Check if 'atcs' array is present
            //                             if (!empty ($drug['atcs'])) {
            //                                 foreach ($drug['atcs'] as $atc) {
            //                                     $flattenedDrug['atc_code'] = $atc['code'];
            //                                     $flattenedDrug['atc_text'] = $atc['text'];
            //                                     $flattenedDrug['atc_official_flag'] = $atc['officialFlag'];
            //                                     $flattenedDrugs[] = $flattenedDrug;
            //                                 }
            //                             } else {
            //                                 $flattenedDrugs[] = $flattenedDrug;
            //                             }
            //                         }
            //                     } else {
            //                         // No maHolders, add a record with empty maHolder details
            //                         $flattenedDrug = [
            //                             'drugName' => $drug['drugName'],
            //                             'drugCode' => $drug['drugCode'],
            //                             'medicinalProductID' => $drug['medicinalProductID'],
            //                             'isGeneric' => $drug['isGeneric'],
            //                             'isPreferred' => $drug['isPreferred'],
            //                             'countryOfSales' => $countryCode,
            //                             'activeIngredients' => $concatenatedIngredients,
            //                             'atc_code' => null,
            //                             'atc_text' => null,
            //                             'atc_official_flag' => null,
            //                             'maHolder_name' => null,
            //                             'maHolder_medicinalProductID' => null,
            //                         ];

            //                         // Check if 'atcs' array is present
            //                         if (!empty ($drug['atcs'])) {
            //                             foreach ($drug['atcs'] as $atc) {
            //                                 $flattenedDrug['atc_code'] = $atc['code'];
            //                                 $flattenedDrug['atc_text'] = $atc['text'];
            //                                 $flattenedDrug['atc_official_flag'] = $atc['officialFlag'];
            //                                 $flattenedDrugs[] = $flattenedDrug;
            //                             }
            //                         } else {
            //                             $flattenedDrugs[] = $flattenedDrug;
            //                         }
            //                     }
            //                 }
            //             } else {
            //                 // No countryOfSales, handle as before
            //                 $flattenedDrug = [
            //                     'drugName' => $drug['drugName'],
            //                     'drugCode' => $drug['drugCode'],
            //                     'medicinalProductID' => $drug['medicinalProductID'],
            //                     'isGeneric' => $drug['isGeneric'],
            //                     'isPreferred' => $drug['isPreferred'],
            //                     'countryOfSales' => null,
            //                     'activeIngredients' => $concatenatedIngredients,
            //                     'atc_code' => null,
            //                     'atc_text' => null,
            //                     'atc_official_flag' => null,
            //                 ];

            //                 // Check if 'atcs' array is present
            //                 if (!empty ($drug['atcs'])) {
            //                     foreach ($drug['atcs'] as $atc) {
            //                         $flattenedDrug['atc_code'] = $atc['code'];
            //                         $flattenedDrug['atc_text'] = $atc['text'];
            //                         $flattenedDrug['atc_official_flag'] = $atc['officialFlag'];
            //                         $flattenedDrugs[] = $flattenedDrug;
            //                     }
            //                 } else {
            //                     $flattenedDrugs[] = $flattenedDrug;
            //                 }
            //             }
            //         }

            //         // Return the flattened array as JSON response
            //         // return response()->json($res);
            //         print ("Data Formattted Successfully!! Initating Insert/Update");
            //         print (count($flattenedDrugs));
            //         foreach ($flattenedDrugs as $flattenedDrug) {
            //             print ($flattenedDrug['drugCode']);
            //             // Check if Drug Exists
            //             $WHODrugInformation = WHODrugInformation::where('drugCode', $flattenedDrug['drugCode'])->first();
            //             if (!empty ($WHODrugInformation)) {
            //                 print ('Already Exists!!');
            //             } else {
            //                 $WHODrugInformation = WHODrugInformation::create($flattenedDrug);
            //                 // $WHODrugInformation->drugName = $flattenedDrug['drugName'];
            //                 // $WHODrugInformation->drugCode = $flattenedDrug['drugCode'];
            //                 // $WHODrugInformation->medicinalProductID = $flattenedDrug['medicinalProductID'];
            //                 // $WHODrugInformation->isGeneric = $flattenedDrug['isGeneric'];
            //                 // $WHODrugInformation->isPreferred = $flattenedDrug['isPreferred'];
            //                 // $WHODrugInformation->countryOfSales = $flattenedDrug['countryOfSales'];
            //                 // $WHODrugInformation->activeIngredients = $flattenedDrug['activeIngredients'];
            //                 // $WHODrugInformation->atc_code = $flattenedDrug['atc_code'];
            //                 // $WHODrugInformation->atc_text = $flattenedDrug['atc_text'];
            //                 // $WHODrugInformation->atc_official_flag = $flattenedDrug['atc_official_flag'];
            //                 // $WHODrugInformation->maHolder_name = $flattenedDrug['maHolder_name'];
            //                 // $WHODrugInformation->maHolder_medicinalProductID = $flattenedDrug['maHolder_medicinalProductID'];

            //                 // $WHODrugInformation->save();
            //                 print ('Inserted!!');
            //             }
            //         }
            //     } else {
            //         $res = array (
            //             'success' => false,
            //             'message' => 'Problem encountered while decoding JSON response!!'
            //         );
            //         print ("Problem encountered while decoding JSON response!!");
            //         print (json_encode($res));
            //         exit ();
            //     }
            // }

        })->everyMinute();

    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}
