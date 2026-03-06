type BookingFieldMap = {
    serviceId: string;
    serviceName: string;
    frequency: string;
    duration: string;
    price: string;
    date: string;
    time: string;
    address: string;
    customerName: string;
    email: string;
    phone: string;
    canton: string;
    observations: string;
    serviceDetails: string;
    status: string;
    createdAt: string;
};

const defaults: BookingFieldMap = {
    serviceId: 'x_service_id',
    serviceName: 'x_service_name',
    frequency: 'x_frequency',
    duration: 'x_duration',
    price: 'x_price',
    date: 'x_data',
    time: 'x_horario',
    address: 'x_address',
    customerName: 'x_name',
    email: 'x_email',
    phone: 'x_phone',
    canton: 'x_canton',
    observations: 'x_observations',
    serviceDetails: 'x_service_details',
    status: 'x_status',
    createdAt: 'x_created_at',
};

function getEnvOrDefault(envName: string, fallback: string): string {
    return process.env[envName] || fallback;
}

export function getBookingFields(): BookingFieldMap {
    return {
        serviceId: getEnvOrDefault('ODOO_BOOKING_FIELD_SERVICE_ID', defaults.serviceId),
        serviceName: getEnvOrDefault('ODOO_BOOKING_FIELD_SERVICE_NAME', defaults.serviceName),
        frequency: getEnvOrDefault('ODOO_BOOKING_FIELD_FREQUENCY', defaults.frequency),
        duration: getEnvOrDefault('ODOO_BOOKING_FIELD_DURATION', defaults.duration),
        price: getEnvOrDefault('ODOO_BOOKING_FIELD_PRICE', defaults.price),
        date: getEnvOrDefault('ODOO_BOOKING_FIELD_DATE', defaults.date),
        time: getEnvOrDefault('ODOO_BOOKING_FIELD_TIME', defaults.time),
        address: getEnvOrDefault('ODOO_BOOKING_FIELD_ADDRESS', defaults.address),
        customerName: getEnvOrDefault('ODOO_BOOKING_FIELD_CUSTOMER_NAME', defaults.customerName),
        email: getEnvOrDefault('ODOO_BOOKING_FIELD_EMAIL', defaults.email),
        phone: getEnvOrDefault('ODOO_BOOKING_FIELD_PHONE', defaults.phone),
        canton: getEnvOrDefault('ODOO_BOOKING_FIELD_CANTON', defaults.canton),
        observations: getEnvOrDefault('ODOO_BOOKING_FIELD_OBSERVATIONS', defaults.observations),
        serviceDetails: getEnvOrDefault('ODOO_BOOKING_FIELD_SERVICE_DETAILS', defaults.serviceDetails),
        status: getEnvOrDefault('ODOO_BOOKING_FIELD_STATUS', defaults.status),
        createdAt: getEnvOrDefault('ODOO_BOOKING_FIELD_CREATED_AT', defaults.createdAt),
    };
}
