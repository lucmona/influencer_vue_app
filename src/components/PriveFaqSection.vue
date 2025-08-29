<template>
  <div class="py-10 w-full">
    <Accordion :data="dummyFaqs" />
  </div>
</template>

<script setup>
import Accordion from './Accordion.vue';

const dummyFaqs = [
  {
    question: 'What is the Uni-loyality program?',
    answer:
      'Uni-loyality program is our loyalty program designed to provide special benefits to our loyal customers. It is a tiered program with three different tiers i.e. Member, Gold & Platinum. The only thing you need to do is to shop with us for a minimum amount to join our Prive program.',
  },
  {
    question: 'How do I become a part of Uni-loyality?',
    answer:
      'To become a part of Uni-loyality program, shop for a minimum eligible amount within a year. You’ll be upgraded automatically.',
  },
  {
    question: 'How do I move to the next tier?',
    answer:
      'Continue shopping to reach the spending threshold for the next tier. The upgrade happens automatically once you qualify.',
  },
];
</script>
