## How do we predict likelihood of death?

### We use Machine Learning

[Machine Learning](https://en.wikipedia.org/wiki/Machine_learning) is a technique that allows computers to make predictions for us. Machine Learning is not magic! Instead, it learns from a sufficiently large number of examples from the past to automatically compile statistics on them and to predict whether an event is likely to happen in the future. 

The _Song of Ice and Fire_ series is known for killing many characters, including prominent ones. While only fewest characters die of an old age, the majority meets a violent end. Does the death come at random or does it come to only those selected ones who exhibit similar features? The features can be certain age, heritage and gender. It can also be the fascinating ability of likely-to-die characters to make similar, mostly wrong, fateful decisions in their lives. 

In this project, we wanted to find features that are common to all already dead characters and use these features to predict the percentage likelihood of death (PLOD) for yet alive characters, aka to answer the question - who is likely to die next?

### Why two algorithms?

The [got.show](got.show) project is a result of the [JavaScript Technology seminar](https://rostlab.org/owiki/index.php/Javascript_technology_2016) that took place in spring 2016 at the [RostLab ](https://rostlab.org/)at [Technical University of Munich](http://www.in.tum.de/). Within this seminar, we were two groups of students developing two different algorithms for the same prediction task - which character is likely to die next?

Both our groups used different features to describe the data and different machine learning algorithms for the predictions. While the SMV-based algorithm  (algorithm 1) performed better at predicting dead characters, it is still interesting to look at the result of the Naive Bayes-based algorithm (algorithm 2).

### Data extraction

The [wiki](http://awoiaf.westeros.org) of Ice and Fire is probably the best resource that summarizes information from all 5 books about each of ~2000 characters. For each character, we extracted from the wiki information about whether the character is dead or not. We also extracted other information  (_i.e._ features) that describe a character, which resulted in a total of over 30 different features!

After this step, we had a data set describing each character - dead or alive - by exactly same features. Our next task was to find the feature set that can best distinguish dead from alive characters.

### Feature selection - algorithm 1

Machine Learning can statistically compare features of dead and alive characters and select those features that are most relevant for distinguishing between them. We provided all features together with the list of all character names as input to the machine learning algorithm.

For feature selection, we used the RELIEF function (Kira and Rendell, 1992) with its default parameters of the WEKA (Hall et al., 2009) workbench. The following 24 features were selected as most contributing with their descriptions in parenthesis, and sorted from most to least contributing:

Feature | Description
:------------- | :------------- | 
A Feast for Crows | Character's appearance in the book |
House | House to which a character belongs |
Culture | Social group to which a character belongs
A Dance with Dragons | Character's appearance in the book
Is noble | Character's nobility based on Title
Gender | Male or female
Title | social status or nobility
Age | Time-reference: 305 AC
A Storm of Swords | Character's appearance in the book
Is married | Represents whether the character is married
Is spouse alive | Represents whether character's spouse is alive
A Clash of Kings | Character's appearance in the book
Related to dead | Represents whether a character is related to another dead character
A Game of Thrones | Character's appearance in the book
Popularity score | The number of internal incoming and outgoing links to the characters webpage in the [http://awoiaf.westeros.org](http://awoiaf.westeros.org) wiki
Is father alive | Represents whether character's father is alive
Major/minor character | Characters with a normalized popularity score >0.34 are considered as major characters
Is mother alive | Represents whether character's mother is alive
Is heir alive | represents whether character's heir is alive
Number dead relations | Number of dead characters to whom a character is related
Spouse | Name of character’s spouse
Father | Name of character’s father
Mother | Name of character’s mother
Heir | Name of character’s heir

### Method description - algorithm 1

We used John Platt's sequential minimal optimization algorithm (Platt, 1999) for training a [Support Vector Machine](https://en.wikipedia.org/wiki/Support_vector_machine) (Cortes and Vapnik, 1995) with the [polynomial kernel](https://en.wikipedia.org/wiki/Polynomial_kernel), which is provided in WEKA (Hall et al., 2009). To train and test our model, we split our data set into 10 equally-sized subsets. We trained our model on 9 subsets and tested on the remaining one. We rotated our subsets such that each subset was used for testing exactly once. This procedure is called a 10-fold [cross-validation](https://en.wikipedia.org/wiki/Cross-validation_%28statistics%29).

### Method performance - algorithm 1

We measured accuracy/precision and coverage/recall of our prediction method using ratios of TP (true positives, _i.e._ correctly predicted dead characters), FP (false positives, _i.e._ alive characters predicted to be dead), FN (false negatives, _i.e._ dead characters predicted to be alive), and TN (true negatives, _i.e._ correctly predicted alive characters).

![alt text](http://www.sciweavers.org/upload/Tex2Img_1459681261/render.png) 
                                            
![alt text](http://www.sciweavers.org/upload/Tex2Img_1459681357/render.png)
                                            
We combined these two measures into a single F-measure value:

![alt text](http://www.sciweavers.org/upload/Tex2Img_1459680185/render.png)

The prediction results of our prediction method were:

Label | Number of characters | Precision | Recall | F-measure
:------------: | :-------------: | :-------------: | :-------------: | :-------------: |
Alive | 1451 | 85% | 78% | 0.82
Dead | 495 | 49% | 60% | 0.54

&nbsp;

&nbsp;

### Feature selection - algorithm 2

The steps of data extraction from the Ice and Fire [wiki](http://awoiaf.westeros.org) and of feature selection were performed as for algorithm 1. However, the feature set of our second group was slightly different and the following features were selected as the most contributing ones for the distinction between dead and alive characters:

Feature | Description
:------------- | :------------- | 
House |House to which a character belongs
Culture | Social group to which a character belongs
Gender | Male or female
Title | Social status or nobility
Age | Time-reference: 305 AC
Has spouse | Indicates whether a character is married
Is spouse alive | Indicates whether character's spouse is alive
Polpularity score | The number of internal incoming and outgoing links to the characters webpage in the [http://awoiaf.westeros.org](http://awoiaf.westeros.org) wiki
House founded | Age of character's house
Has heir | Indicates whether a character has a heir
Has title | Indicates whether a character has title
Multiple books | Indicates whether a character appears in more than one book
Has heir alive | Indicates whether character's heir is alive
Is noble | Indicates whether a character belongs to a noble blood line

### Method description - algorithm 2

We used the implementation of the [Naive Bayes](https://en.wikipedia.org/wiki/Naive_Bayes_classifier) classifier (John and Langley, 1995) with its default parameters, which is provided in WEKA (Hall et al., 2009). Similar to the procedure of algorithm 1, we split our data set into 10 equally-sized subsets. We trained our model on 9 subsets and tested on the remaining one. We rotated our subsets such that each subset was used for testing exactly once. 

### Method performance - algorithm 2

The prediction results were:

Label | Number of characters | Precision | Recall | F-measure
:------------: | :-------------: | :-------------: | :-------------: | :-------------: |
Alive | 1473 | 80% | 88% | 0.84
Dead | 466 | 43% | 88% | 0.34

### References

Kira, K. and Rendell, L.A., 1992, July. A practical approach to feature selection. In _Proceedings of the ninth international workshop on Machine learning_ (pp. 249-256).

Hall, M., Frank, E., Holmes, G., Pfahringer, B., Reutemann, P. and Witten, I.H., 2009. The WEKA data mining software: an update. _ACM SIGKDD explorations newsletter, 11_(1), pp.10-18.

Platt, John C. "12 fast training of support vector machines using sequential minimal optimization." _Advances in kernel methods_ (1999): 185-208.

Cortes, C. and Vapnik, V., 1995. Support-vector networks. _Machine learning, 20_(3), pp.273-297.

John, G.H. and Langley, P., 1995, August. Estimating continuous distributions in Bayesian classifiers. In _Proceedings of the Eleventh conference on Uncertainty in artificial intelligence_ (pp. 338-345). Morgan Kaufmann Publishers Inc.
