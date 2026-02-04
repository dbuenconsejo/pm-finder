<?php

namespace Database\Seeders;

use App\Models\PropertyManager;
use App\Models\Property;
use App\Models\Review;
use App\Models\ServiceArea;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class PropertyManagerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $propertyManagers = [
            [
                'user' => [
                    'name' => 'Maria Santos',
                    'email' => 'maria.santos@pmfinder.test',
                    'password' => Hash::make('password'),
                    'role' => 'manager',
                ],
                'profile' => [
                    'business_name' => 'Santos Property Management',
                    'bio' => 'With over 15 years of experience in Metro Manila real estate, we provide comprehensive property management services for residential and commercial properties.',
                    'phone' => '+63 917 123 4567',
                    'services' => ['Tenant Screening', 'Rent Collection', 'Property Maintenance', 'Financial Reporting'],
                    'service_types' => ['Residential', 'Condo'],
                    'latitude' => 14.5995,
                    'longitude' => 120.9842,
                    'address' => '123 Ayala Avenue',
                    'city' => 'Makati',
                    'province' => 'Metro Manila',
                    'barangay' => 'Bel-Air',
                    'service_radius_km' => 15,
                    'is_verified' => true,
                    'is_available' => true,
                ],
                'service_areas' => [
                    ['province' => 'Metro Manila', 'city' => 'Makati', 'barangay' => 'Bel-Air'],
                    ['province' => 'Metro Manila', 'city' => 'Makati', 'barangay' => 'Legaspi Village'],
                    ['province' => 'Metro Manila', 'city' => 'Taguig', 'barangay' => 'BGC'],
                ],
                'properties' => [
                    ['title' => 'Modern 2BR Condo in Makati', 'description' => 'Fully furnished 2-bedroom condo with city view', 'property_type' => 'Condo', 'location' => 'Makati CBD'],
                    ['title' => 'Cozy Studio in Legaspi Village', 'description' => 'Perfect for young professionals', 'property_type' => 'Condo', 'location' => 'Legaspi Village, Makati'],
                ],
            ],
            [
                'user' => [
                    'name' => 'Juan Dela Cruz',
                    'email' => 'juan.delacruz@pmfinder.test',
                    'password' => Hash::make('password'),
                    'role' => 'manager',
                ],
                'profile' => [
                    'business_name' => 'Dela Cruz Realty Services',
                    'bio' => 'Family-owned property management company specializing in residential properties in Quezon City and surrounding areas.',
                    'phone' => '+63 918 234 5678',
                    'services' => ['Tenant Screening', 'Rent Collection', 'Lease Management', 'Property Inspection'],
                    'service_types' => ['Residential'],
                    'latitude' => 14.6760,
                    'longitude' => 121.0437,
                    'address' => '456 Tomas Morato Avenue',
                    'city' => 'Quezon City',
                    'province' => 'Metro Manila',
                    'barangay' => 'South Triangle',
                    'service_radius_km' => 20,
                    'is_verified' => true,
                    'is_available' => true,
                ],
                'service_areas' => [
                    ['province' => 'Metro Manila', 'city' => 'Quezon City', 'barangay' => 'South Triangle'],
                    ['province' => 'Metro Manila', 'city' => 'Quezon City', 'barangay' => 'Diliman'],
                    ['province' => 'Metro Manila', 'city' => 'Quezon City', 'barangay' => 'Cubao'],
                ],
                'properties' => [
                    ['title' => 'Spacious 3BR House in QC', 'description' => 'Large family home with garden', 'property_type' => 'Residential', 'location' => 'Quezon City'],
                    ['title' => 'Townhouse near Tomas Morato', 'description' => '2-storey townhouse, perfect for families', 'property_type' => 'Residential', 'location' => 'South Triangle, QC'],
                ],
            ],
            [
                'user' => [
                    'name' => 'Ana Reyes',
                    'email' => 'ana.reyes@pmfinder.test',
                    'password' => Hash::make('password'),
                    'role' => 'manager',
                ],
                'profile' => [
                    'business_name' => 'Reyes Commercial Properties',
                    'bio' => 'Expert in commercial property management with a focus on office spaces and retail establishments in Ortigas Center.',
                    'phone' => '+63 919 345 6789',
                    'services' => ['Tenant Screening', 'Rent Collection', 'Financial Reporting', 'Building Maintenance', 'Commercial Leasing'],
                    'service_types' => ['Commercial'],
                    'latitude' => 14.5873,
                    'longitude' => 121.0615,
                    'address' => '789 Ortigas Avenue',
                    'city' => 'Pasig',
                    'province' => 'Metro Manila',
                    'barangay' => 'Ortigas Center',
                    'service_radius_km' => 10,
                    'is_verified' => true,
                    'is_available' => true,
                ],
                'service_areas' => [
                    ['province' => 'Metro Manila', 'city' => 'Pasig', 'barangay' => 'Ortigas Center'],
                    ['province' => 'Metro Manila', 'city' => 'Mandaluyong', 'barangay' => 'Shaw Boulevard'],
                ],
                'properties' => [
                    ['title' => 'Prime Office Space in Ortigas', 'description' => '500 sqm office space with parking', 'property_type' => 'Commercial', 'location' => 'Ortigas Center'],
                    ['title' => 'Retail Space in Shaw', 'description' => 'Ground floor retail with high foot traffic', 'property_type' => 'Commercial', 'location' => 'Shaw Boulevard'],
                ],
            ],
            [
                'user' => [
                    'name' => 'Pedro Garcia',
                    'email' => 'pedro.garcia@pmfinder.test',
                    'password' => Hash::make('password'),
                    'role' => 'manager',
                ],
                'profile' => [
                    'business_name' => 'Garcia Vacation Rentals',
                    'bio' => 'Specializing in vacation rental management in Tagaytay and Batangas. We handle everything from guest communication to property maintenance.',
                    'phone' => '+63 920 456 7890',
                    'services' => ['Guest Communication', 'Cleaning Services', 'Property Maintenance', 'Booking Management', 'Rent Collection'],
                    'service_types' => ['Vacation Rental'],
                    'latitude' => 14.1153,
                    'longitude' => 120.9621,
                    'address' => '321 Tagaytay-Nasugbu Highway',
                    'city' => 'Tagaytay',
                    'province' => 'Cavite',
                    'barangay' => 'Maharlika East',
                    'service_radius_km' => 30,
                    'is_verified' => false,
                    'is_available' => true,
                ],
                'service_areas' => [
                    ['province' => 'Cavite', 'city' => 'Tagaytay', 'barangay' => null],
                    ['province' => 'Batangas', 'city' => 'Nasugbu', 'barangay' => null],
                    ['province' => 'Batangas', 'city' => 'Lian', 'barangay' => null],
                ],
                'properties' => [
                    ['title' => 'Tagaytay Staycation House', 'description' => 'Beautiful vacation home with Taal view', 'property_type' => 'Vacation Rental', 'location' => 'Tagaytay, Cavite'],
                    ['title' => 'Beach House in Nasugbu', 'description' => 'Beachfront property perfect for family getaways', 'property_type' => 'Vacation Rental', 'location' => 'Nasugbu, Batangas'],
                ],
            ],
            [
                'user' => [
                    'name' => 'Lisa Tan',
                    'email' => 'lisa.tan@pmfinder.test',
                    'password' => Hash::make('password'),
                    'role' => 'manager',
                ],
                'profile' => [
                    'business_name' => 'Tan Property Solutions',
                    'bio' => 'Full-service property management for condominiums in BGC and Makati. We provide 24/7 support for both landlords and tenants.',
                    'phone' => '+63 921 567 8901',
                    'services' => ['Tenant Screening', 'Rent Collection', 'Property Maintenance', 'Financial Reporting', 'Legal Assistance'],
                    'service_types' => ['Condo', 'Residential'],
                    'latitude' => 14.5547,
                    'longitude' => 121.0509,
                    'address' => '555 Bonifacio High Street',
                    'city' => 'Taguig',
                    'province' => 'Metro Manila',
                    'barangay' => 'Fort Bonifacio',
                    'service_radius_km' => 12,
                    'is_verified' => true,
                    'is_available' => true,
                ],
                'service_areas' => [
                    ['province' => 'Metro Manila', 'city' => 'Taguig', 'barangay' => 'Fort Bonifacio'],
                    ['province' => 'Metro Manila', 'city' => 'Taguig', 'barangay' => 'McKinley Hill'],
                    ['province' => 'Metro Manila', 'city' => 'Makati', 'barangay' => 'Poblacion'],
                ],
                'properties' => [
                    ['title' => 'Luxury 1BR in BGC', 'description' => 'High-end condo with amenities', 'property_type' => 'Condo', 'location' => 'BGC, Taguig'],
                    ['title' => '3BR in McKinley Hill', 'description' => 'Spacious family unit with great views', 'property_type' => 'Condo', 'location' => 'McKinley Hill, Taguig'],
                    ['title' => 'Penthouse in Makati', 'description' => 'Premium penthouse unit', 'property_type' => 'Condo', 'location' => 'Poblacion, Makati'],
                ],
            ],
            [
                'user' => [
                    'name' => 'Roberto Mendoza',
                    'email' => 'roberto.mendoza@pmfinder.test',
                    'password' => Hash::make('password'),
                    'role' => 'manager',
                ],
                'profile' => [
                    'business_name' => 'Mendoza Property Care',
                    'bio' => 'Affordable property management services in Cavite and Laguna. We help first-time landlords maximize their rental income.',
                    'phone' => '+63 922 678 9012',
                    'services' => ['Tenant Screening', 'Rent Collection', 'Property Inspection', 'Lease Management'],
                    'service_types' => ['Residential'],
                    'latitude' => 14.2097,
                    'longitude' => 121.1653,
                    'address' => '888 National Highway',
                    'city' => 'Santa Rosa',
                    'province' => 'Laguna',
                    'barangay' => 'Balibago',
                    'service_radius_km' => 25,
                    'is_verified' => false,
                    'is_available' => true,
                ],
                'service_areas' => [
                    ['province' => 'Laguna', 'city' => 'Santa Rosa', 'barangay' => null],
                    ['province' => 'Laguna', 'city' => 'Binan', 'barangay' => null],
                    ['province' => 'Cavite', 'city' => 'Imus', 'barangay' => null],
                    ['province' => 'Cavite', 'city' => 'Bacoor', 'barangay' => null],
                ],
                'properties' => [
                    ['title' => 'Affordable House in Santa Rosa', 'description' => '2BR house perfect for small families', 'property_type' => 'Residential', 'location' => 'Santa Rosa, Laguna'],
                    ['title' => 'Subdivision House in Imus', 'description' => 'Newly built house in gated community', 'property_type' => 'Residential', 'location' => 'Imus, Cavite'],
                ],
            ],
            [
                'user' => [
                    'name' => 'Carmen Lim',
                    'email' => 'carmen.lim@pmfinder.test',
                    'password' => Hash::make('password'),
                    'role' => 'manager',
                ],
                'profile' => [
                    'business_name' => 'Lim Premium Estates',
                    'bio' => 'Luxury property management services for high-end condominiums and exclusive subdivisions. White-glove service guaranteed.',
                    'phone' => '+63 923 789 0123',
                    'services' => ['Tenant Screening', 'Rent Collection', 'Concierge Services', 'Property Maintenance', 'Financial Reporting', 'Legal Assistance'],
                    'service_types' => ['Condo', 'Residential'],
                    'latitude' => 14.5649,
                    'longitude' => 121.0193,
                    'address' => '999 Rockwell Drive',
                    'city' => 'Makati',
                    'province' => 'Metro Manila',
                    'barangay' => 'Rockwell Center',
                    'service_radius_km' => 8,
                    'is_verified' => true,
                    'is_available' => true,
                ],
                'service_areas' => [
                    ['province' => 'Metro Manila', 'city' => 'Makati', 'barangay' => 'Rockwell Center'],
                    ['province' => 'Metro Manila', 'city' => 'Makati', 'barangay' => 'Salcedo Village'],
                ],
                'properties' => [
                    ['title' => 'Exclusive Unit at The Proscenium', 'description' => 'Ultra-luxury 3BR with premium finishes', 'property_type' => 'Condo', 'location' => 'Rockwell, Makati'],
                    ['title' => 'Joya Lofts Penthouse', 'description' => 'Stunning penthouse with panoramic views', 'property_type' => 'Condo', 'location' => 'Rockwell, Makati'],
                ],
            ],
            [
                'user' => [
                    'name' => 'Miguel Torres',
                    'email' => 'miguel.torres@pmfinder.test',
                    'password' => Hash::make('password'),
                    'role' => 'manager',
                ],
                'profile' => [
                    'business_name' => 'Torres Property Hub',
                    'bio' => 'Cebu-based property management company serving the Visayas region. Expertise in both residential and commercial properties.',
                    'phone' => '+63 924 890 1234',
                    'services' => ['Tenant Screening', 'Rent Collection', 'Property Maintenance', 'Lease Management'],
                    'service_types' => ['Residential', 'Commercial', 'Condo'],
                    'latitude' => 10.3157,
                    'longitude' => 123.8854,
                    'address' => '123 Cebu Business Park',
                    'city' => 'Cebu City',
                    'province' => 'Cebu',
                    'barangay' => 'Lahug',
                    'service_radius_km' => 20,
                    'is_verified' => true,
                    'is_available' => true,
                ],
                'service_areas' => [
                    ['province' => 'Cebu', 'city' => 'Cebu City', 'barangay' => 'Lahug'],
                    ['province' => 'Cebu', 'city' => 'Cebu City', 'barangay' => 'IT Park'],
                    ['province' => 'Cebu', 'city' => 'Mandaue', 'barangay' => null],
                    ['province' => 'Cebu', 'city' => 'Lapu-Lapu', 'barangay' => null],
                ],
                'properties' => [
                    ['title' => 'IT Park Condo Unit', 'description' => 'Modern condo near tech companies', 'property_type' => 'Condo', 'location' => 'IT Park, Cebu'],
                    ['title' => 'Office Space in Cebu Business Park', 'description' => 'Prime commercial space', 'property_type' => 'Commercial', 'location' => 'Cebu Business Park'],
                ],
            ],
        ];

        // Create sample reviewers (regular users)
        $reviewers = [];
        $reviewerData = [
            ['name' => 'Mark Johnson', 'email' => 'mark.johnson@example.com'],
            ['name' => 'Sarah Lee', 'email' => 'sarah.lee@example.com'],
            ['name' => 'David Chen', 'email' => 'david.chen@example.com'],
            ['name' => 'Emily Brown', 'email' => 'emily.brown@example.com'],
            ['name' => 'James Wilson', 'email' => 'james.wilson@example.com'],
        ];

        foreach ($reviewerData as $data) {
            $reviewers[] = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => Hash::make('password'),
                'role' => 'owner',
            ]);
        }

        // Create property managers with related data
        foreach ($propertyManagers as $pmData) {
            // Create user
            $user = User::create($pmData['user']);

            // Create property manager profile
            $pm = PropertyManager::create(array_merge(
                $pmData['profile'],
                ['user_id' => $user->id]
            ));

            // Create service areas
            foreach ($pmData['service_areas'] as $areaData) {
                ServiceArea::create(array_merge(
                    $areaData,
                    ['property_manager_id' => $pm->id]
                ));
            }

            // Create properties
            foreach ($pmData['properties'] as $propertyData) {
                Property::create(array_merge(
                    $propertyData,
                    ['property_manager_id' => $pm->id]
                ));
            }

            // Create random reviews (2-4 reviews per property manager)
            $numReviews = rand(2, 4);
            $usedReviewers = [];
            
            for ($i = 0; $i < $numReviews; $i++) {
                // Pick a random reviewer that hasn't reviewed this PM yet
                $availableReviewers = array_filter($reviewers, fn($r) => !in_array($r->id, $usedReviewers));
                if (empty($availableReviewers)) break;
                
                $reviewer = $availableReviewers[array_rand($availableReviewers)];
                $usedReviewers[] = $reviewer->id;

                $rating = rand(3, 5); // Mostly positive reviews
                $comments = [
                    5 => [
                        'Excellent service! Very professional and responsive.',
                        'Highly recommended! They took great care of my property.',
                        'Best property manager I\'ve worked with. 5 stars!',
                    ],
                    4 => [
                        'Great service overall. Minor communication delays but very reliable.',
                        'Good experience. Would recommend to others.',
                        'Professional team, handled everything smoothly.',
                    ],
                    3 => [
                        'Decent service. Room for improvement in response time.',
                        'Average experience. Gets the job done.',
                        'Okay service, nothing exceptional but no major issues.',
                    ],
                ];

                Review::create([
                    'property_manager_id' => $pm->id,
                    'user_id' => $reviewer->id,
                    'rating' => $rating,
                    'comment' => $comments[$rating][array_rand($comments[$rating])],
                ]);
            }

            // Update the PM's rating
            $pm->updateRating();
            $pm->profile_views = rand(50, 500);
            $pm->save();
        }

        $this->command->info('Created ' . count($propertyManagers) . ' property managers with properties, service areas, and reviews.');
    }
}
