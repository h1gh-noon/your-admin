<template>
  <BTableSimple hover small caption-top responsive>
    <BThead head-variant="dark">
      <BTr>
        <BTh>Clothes</BTh>
        <BTh>Accessories</BTh>
        <BTh>Accessories</BTh>
      </BTr>
    </BThead>
    <BTbody>
      <BTr>
        <BTd>56</BTd>
        <BTd>22</BTd>
        <BTd>43</BTd>
      </BTr>
      <BTr>
        <BTd variant="warning">18</BTd>
        <BTd>61</BTd>
        <BTd variant="danger">15</BTd>
      </BTr>
      <BTr>
        <BTd>51</BTd>
        <BTd>69</BTd>
        <BTd>28</BTd>
      </BTr>
      <BTr>
        <BTh class="text-end">Amsterdam</BTh>
        <BTd variant="success">89</BTd>
        <BTd>34</BTd>
      </BTr>
      <BTr>
        <BTd>80</BTd>
        <BTd variant="danger">12</BTd>
        <BTd variant="warning">19</BTd>
      </BTr>
    </BTbody>
  </BTableSimple>
</template>
<script setup name="table-template">
import { reactive } from "vue";


</script>
