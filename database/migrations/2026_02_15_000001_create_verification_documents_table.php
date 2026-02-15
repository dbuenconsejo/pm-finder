<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('verification_documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('property_manager_id')->constrained()->onDelete('cascade');
            $table->string('document_type'); // 'government_id', 'business_permit', 'certification', 'other'
            $table->string('document_name'); // original filename or label
            $table->string('file_path'); // storage path
            $table->string('status')->default('pending'); // 'pending', 'approved', 'rejected'
            $table->text('admin_notes')->nullable(); // admin feedback on the document
            $table->foreignId('reviewed_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('reviewed_at')->nullable();
            $table->timestamps();
        });

        // Add verification_status and verification_submitted_at to property_managers
        Schema::table('property_managers', function (Blueprint $table) {
            $table->string('verification_status')->default('unsubmitted')->after('is_verified');
            // 'unsubmitted', 'pending', 'approved', 'rejected'
            $table->text('verification_notes')->nullable()->after('verification_status');
            $table->timestamp('verification_submitted_at')->nullable()->after('verification_notes');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('verification_documents');

        Schema::table('property_managers', function (Blueprint $table) {
            $table->dropColumn(['verification_status', 'verification_notes', 'verification_submitted_at']);
        });
    }
};
