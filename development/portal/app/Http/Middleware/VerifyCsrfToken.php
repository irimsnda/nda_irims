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
       'utilities/onAddUniformApplicantDataset',
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
       'clinicaltrials/saveComparatorProductDetailsDetails',
       'importexportapp/saveDisposalApplication',
       'importexportapp/saveDisposalPermitProductdetails',
       'documentmanagement/onunfitProductsUpload',
       'tradermanagement/onUpdateTraderAccountDetails',
       'utilities/onCustomerAccountRegistrationSubmission',
       'tradermanagement/onPharmacisAccountUsersRegistration',
       'premisesregistration/onSavePremisesApplication',
       'premisesregistration/onSavePremisesStoreLocationDetails',
       'premisesregistration/onSavePremisesDirectors',
       'premisesregistration/onSavePremisesDirectorsDetails',
       'premisesregistration/onDeletePremisesDetails',
       'premisesregistration/onSavePremisesholder',
       'premisesregistration/onSavePremisesPersonnel',
       'importexportapp/onDeletePermitdetails',
       'premisesregistration/onSaveTelephoneDetails',
       'premisesregistration/onSaveRenPremisesApplication',
       'authentication/onFuncChangePassword',
       'utilities/saveManufacturerSiteFulldetails',
       'gmpinspection/onSaveGmpApplication',
       'gmpinspection/onSavemanufatcuringSiteBlocks',
       'premisesregistration/onSaveDrugShopStoreLocationDetails',
       'premisesregistration/onSaveApprovalRecomDetails'
    ];
}
