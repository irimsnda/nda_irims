<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * Indicates whether the XSRF-TOKEN cookie should be set on the response.
     *
     * @var bool
     */
    protected $addHttpCookie = true;

    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array
     */
    protected $except = [
       'utilities/onPermitApplicationSubmit',
       'authentication/onUserLogin',
       'administration/onUserLogOut',
       'tradermanagement/onAccountRegistration',
       'clinicaltrials/saveClinicalTrialApplication',
       'documentmanagement/resumableuploadApplicationDocumentFile',
       'clinicaltrials/saveCtrProgressReportingApplication',
       'clinicaltrials/saveCtrOtherReportingApplication',
       'clinicaltrials/saveCtrSaeReportingApplication',
       'importexportapp/onAddUniformApplicantDataset',
       'clinicaltrials/onSaveClinicalStudySite',
       'clinicaltrials/onsaveclinicaltInvestigatorDetails',
       'clinicaltrials/onsaveclinicaltMonitorDetails',
       'clinicaltrials/saveiMPProductDetailsDetails',
       'clinicaltrials/saveComparatorProductDetailsDetails'
       
        //
    ];
}
