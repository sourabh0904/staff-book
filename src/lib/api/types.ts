// API Response Types

export interface ApiResponse<T> {
    status: number;
    statusText: string;
    message: string;
    data: T;
}

// Auth Types
export interface RegisterRequest {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password: string;
    phone: string;
    country_code: string;
    device_type: string;
    device_token: string;
    device_token_voip_ios: string;
}

export interface RegisterResponse {
    token: string;
}

export interface LoginRequest {
    email: string;
    password: string;
    device_type: string;
    device_token: string;
    device_token_voip_ios: string;
}

export interface UserBalance {
    user_id: number;
    no_of_resume: number;
    no_of_banner: number;
    no_of_generate_lin: number;
    no_of_job_post: number;
    no_of_contact: number;
}

export interface User {
    resume_download_counts: number;
    profile_view: number;
    resume_upload: string;
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    bio: string;
    description: string;
    designation: string;
    image: string;
    backimage: string;
    is_verified: number;
    country_code: string;
    phone: string;
    sex: string | null;
    dob: string | null;
    paypal_id: string | null;
    available_balance: number;
    available_coin: number;
    is_biometric_login: number;
    is_push_notification_allow: number;
    account_created_with: number;
    is_login_first_time: number;
    device_token: string;
    city: string;
    state: string;
    country: string;
    is_reported: number;
    picture: string;
    backpicture: string;
    userStory: unknown | null;
    totalConnection: number;
    totalJobPost: number;
    userBalance: UserBalance;
    resumeUpload: string;
    profileHeadline: string;
    cover_image?: string;
}

export interface LoginResponse {
    user: User;
    auth_key: string;
}
