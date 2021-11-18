  <template>
	<div>
		<ul>
		<li v-for="(post, index) in posts" :key="index">
  <a :href="'post.url'" target="_blank" rel="noopener noreferrer">{{ post.title }}</a>
			</li>
		</ul>
	</div>
</template>
  
  
  
  <script>
import axios from 'axios';

export default {
  data(){
    return {
      posts: []
    }
  },
  mounted(){
    axios.get('http://localhost:4000')
          .then(response => this.posts = response.data);
  }
}
</script>