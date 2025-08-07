<script lang="ts">
  import { onMount } from 'svelte';
  import { CheckCircle, User, Target, Heart, Package, Globe, Palette, ChevronLeft, ChevronRight } from 'lucide-svelte';
    import { addDoc, collection } from 'firebase/firestore';
    import { db } from '../firebase';

  interface FormData {
    longTermVision: string;
    successDefinition: string;
    customerAcquisition: string;
    customerObjections: string;
    desiredFeelings: string;
    brandDifferentiation: string;
    pricingStrategy: string;
    popularOfferings: string;
    unexpectedValue: string;
    websiteRole: string;
    currentWebsiteIssues: string;
    userTracking: string;
    requiredIntegrations: string;
    futureFeatures: string;
    designElements: string;
    inspirationalBrands: string;
    storytellingBalance: string;
    companyName: string;
    contactName: string;
    email: string;
    phone: string;
  }

  let formData: FormData = {
    longTermVision: '',
    successDefinition: '',
    customerAcquisition: '',
    customerObjections: '',
    desiredFeelings: '',
    brandDifferentiation: '',
    pricingStrategy: '',
    popularOfferings: '',
    unexpectedValue: '',
    websiteRole: '',
    currentWebsiteIssues: '',
    userTracking: '',
    requiredIntegrations: '',
    futureFeatures: '',
    designElements: '',
    inspirationalBrands: '',
    storytellingBalance: '',
    companyName: '',
    contactName: '',
    email: '',
    phone: ''
  };

  const steps = [
    { id: 1, title: 'Contact Information', icon: User, description: 'Basic client details' },
    { id: 2, title: 'Purpose & Vision', icon: Target, description: 'Foundational goals and aspirations' },
    { id: 3, title: 'Audience & Behavior', icon: Heart, description: 'Customer insights and conversion factors' },
    { id: 4, title: 'Brand Personality', icon: Heart, description: 'Voice, tone, and brand identity' },
    { id: 5, title: 'Products & Services', icon: Package, description: 'Offerings and value propositions' },
    { id: 6, title: 'Digital Strategy', icon: Globe, description: 'Technical requirements and user experience' },
    { id: 7, title: 'Brand Expression', icon: Palette, description: 'Visual identity and design preferences' }
  ];

  let currentStep = 1;
  let isSubmitted = false;

  function nextStep() {
    if (currentStep < steps.length) currentStep += 1;
  }

  function prevStep() {
    if (currentStep > 1) currentStep -= 1;
  }

  function handleSubmit() {
    // Here you would integrate with your CRM
    console.log('Form submitted:', formData);
    isSubmitted = true;
    exportData();
  }

  async function exportData() {
    try {
      const docRef = await addDoc(collection(db, 'onboardingData'), formData);
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }
</script>

{#if isSubmitted}
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
    <div class="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
      <div class="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
        <CheckCircle class="w-8 h-8 text-green-600" />
      </div>
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Thank You!</h2>
      <p class="text-gray-600 mb-6">
        Your onboarding information has been successfully submitted. We'll use this to create the perfect digital experience for your brand.
      </p>
    </div>
  </div>
{:else}
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Client Onboarding</h1>
        <p class="text-gray-600">Help us understand your brand and vision</p>
      </div>

      <!-- Progress Bar -->
      <div class="mb-8">
        <div class="flex items-center justify-between mb-4">
          {#each steps as step, index}
            <div class="flex flex-col items-center">
              <div
                class={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  currentStep >= step.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                <svelte:component this={step.icon} class="w-5 h-5" />
              </div>
              <div class="text-xs text-center mt-2 max-w-16">
                <div class="font-medium text-gray-900">{step.title}</div>
              </div>
            </div>
          {/each}
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div
            class="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
            style="width: {(currentStep / steps.length) * 100}%"
          />
        </div>
      </div>

      <!-- Form Content -->
      <div class="bg-white rounded-2xl shadow-xl p-8">
        <div class="mb-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-2">{steps[currentStep - 1].title}</h2>
          <p class="text-gray-600">{steps[currentStep - 1].description}</p>
        </div>

        {#if currentStep === 1}
          <!-- Contact Info -->
          <div class="space-y-6">
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  bind:value={formData.companyName}
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your company name"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Contact Name *
                </label>
                <input
                  type="text"
                  bind:value={formData.contactName}
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Your full name"
                />
              </div>
            </div>
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  bind:value={formData.email}
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="your.email@company.com"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  bind:value={formData.phone}
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
          </div>
        {/if}

        {#if currentStep === 2}
          <!-- Purpose & Vision -->
          <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                What is your long-term vision for the brand? Where do you want to be in 3, 5, and 10 years?
              </label>
              <textarea
                bind:value={formData.longTermVision}
                rows="4"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Describe your long-term vision and goals..."
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                How would you define success for your brand—not just financially, but culturally and socially?
              </label>
              <textarea
                bind:value={formData.successDefinition}
                rows="4"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Define what success means beyond financial metrics..."
              />
            </div>
          </div>
        {/if}

        {#if currentStep === 3}
          <!-- Audience & Behavior -->
          <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                How do your customers currently find you (search, word-of-mouth, social, etc.)?
              </label>
              <textarea
                bind:value={formData.customerAcquisition}
                rows="3"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Describe your current customer acquisition channels..."
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                What objections or hesitations do new customers often have before converting?
              </label>
              <textarea
                bind:value={formData.customerObjections}
                rows="3"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="List common customer concerns or objections..."
              />
            </div>
          </div>
        {/if}

        {#if currentStep === 4}
          <!-- Brand Personality -->
          <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                What do you want people to feel when they interact with your website?
              </label>
              <textarea
                bind:value={formData.desiredFeelings}
                rows="3"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Describe the emotions and feelings you want to evoke..."
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                What makes your brand unlike any other in your space?
              </label>
              <textarea
                bind:value={formData.brandDifferentiation}
                rows="3"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Explain your unique value proposition and differentiators..."
              />
            </div>
          </div>
        {/if}

        {#if currentStep === 5}
          <!-- Products & Services -->
          <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                How do you price your products/services—and why that way?
              </label>
              <textarea
                bind:value={formData.pricingStrategy}
                rows="3"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Explain your pricing strategy and reasoning..."
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                What are your most popular offerings—and which ones do you want to grow?
              </label>
              <textarea
                bind:value={formData.popularOfferings}
                rows="3"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="List your top products/services and growth priorities..."
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                What value do customers get that they didn't expect?
              </label>
              <textarea
                bind:value={formData.unexpectedValue}
                rows="3"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Describe the unexpected benefits customers discover..."
              />
            </div>
          </div>
        {/if}

        {#if currentStep === 6}
          <!-- Digital Strategy -->
          <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                What role does your website currently play in your business model? (lead gen, e-commerce, education, etc.)
              </label>
              <textarea
                bind:value={formData.websiteRole}
                rows="2"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Describe your website's current business function..."
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                What's working well about your current website—and what frustrates you?
              </label>
              <textarea
                bind:value={formData.currentWebsiteIssues}
                rows="3"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="List what works and what needs improvement..."
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                How do you track user behavior and success on your site (if at all)?
              </label>
              <textarea
                bind:value={formData.userTracking}
                rows="2"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Describe your current analytics and tracking methods..."
              />
            </div>
            <div>
              <!-- svelte-ignore a11y_label_has_associated_control -->
              <label class="block text-sm font-medium text-gray-700 mb-2">
                What integrations or tools do you rely on (CRM, payment, booking, email, analytics, etc.)?
              </label>
              <textarea
                bind:value={formData.requiredIntegrations}
                rows="3"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="List all tools and platforms you need integrated..."
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                What future digital features or capabilities do you want your site to support?
              </label>
              <textarea
                bind:value={formData.futureFeatures}
                rows="3"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Describe desired future functionality and features..."
              />
            </div>
          </div>
        {/if}

        {#if currentStep === 7}
          <!-- Brand Expression -->
          <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                What colors, fonts, or design elements feel essential to your brand?
              </label>
              <textarea
                bind:value={formData.designElements}
                rows="3"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Describe your brand's visual identity requirements..."
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Are there any brands (in or out of your industry) whose websites you admire? Why?
              </label>
              <textarea
                bind:value={formData.inspirationalBrands}
                rows="3"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="List inspiring brands and what you like about their websites..."
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                How should your site balance storytelling with utility (content
                How should your site balance storytelling with utility (content vs. functionality)?
              </label>
              <textarea
                bind:value={formData.storytellingBalance}
                rows="4"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Example: 'We want rich storytelling with elegant animations (70%) balanced with clear CTAs and conversion funnels (30%)' or 'Focus heavily on functionality with minimal but powerful storytelling elements'"
              />
            </div>
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p class="text-sm text-blue-800">
                <strong>Storytelling vs. Utility Examples:</strong><br/>
                • <strong>Storytelling-focused:</strong> Rich animations, immersive content, brand narratives, emotional connections<br/>
                • <strong>Utility-focused:</strong> Clear call-to-actions, conversion funnels, streamlined user flows, minimal distractions<br/>
                • <strong>Balanced:</strong> Engaging visuals with strategic CTAs, story elements that guide toward conversions
              </p>
            </div>
          </div>
        {/if}

        <!-- Navigation -->
        <div class="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
          <button
            on:click={prevStep}
            disabled={currentStep === 1}
            class="flex items-center px-6 py-3 rounded-lg font-medium transition-all
              {currentStep === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}"
          >
            <ChevronLeft class="w-5 h-5 mr-2" />
            Previous
          </button>
          <div class="text-sm text-gray-500">
            Step {currentStep} of {steps.length}
          </div>
          {#if currentStep === steps.length}
            <button
              on:click={handleSubmit}
              class="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all"
            >
              Submit Form
              <CheckCircle class="w-5 h-5 ml-2" />
            </button>
          {:else}
            <button
              on:click={nextStep}
              class="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all"
            >
              Next
              <ChevronRight class="w-5 h-5 ml-2" />
            </button>
          {/if}
        </div>
      </div>
    </div>
  </div>
{/if}
