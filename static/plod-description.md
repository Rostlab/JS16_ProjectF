## Why do Machine Learning?

[Machine Learning](https://en.wikipedia.org/wiki/Machine_learning) is a technique that allows computers to make predictions for us. Machine Learning is not magic! Instead, it learns from a sufficiently large number of examples from the past to automatically compile statistics on them and to predict whether an event is likely to happen in the future. 

The _Song of Ice and Fire_ series is known for killing many characters, including prominent ones. While only fewest characters die of an old age, the majority meets a violent end. Does the death come at random or does it come to only those selected ones who exhibit similar features? The features can be certain age, heritage and gender. It can also be the fascinating ability of likely-to-die characters to make similar, mostly wrong, fateful decisions in their lives. 

In this project, we wanted to find features that are common to all already dead characters and use these features to predict the percentage likelihood of death (PLOD) for yet alive characters, aka to answer the question - who is likely to die next?

### Data extraction

The [wiki ](http://awoiaf.westeros.org) of Ice and Fire is probably the best resource that summarizes information from all 5 books about each of ~2000 characters. For each character, we extracted from the wiki information about whether the character is dead or not. We also extracted other information  (_i.e._ features) that describe a character, which resulted in a total of over 30 different features!

After this step, we had a data set describing each character - dead or alive - by exactly same features. Our next task was to find the feature set that can best distinguish dead from alive characters.

### Feature selection

Machine Learning can statistically compare features of dead and alive characters and select those features that are most relevant for distinguishing between them. We provided all features together with the list of all character names as input to the machine learning algorithm.

For feature selection, we used the RELIEF function (Kira and Rendell, 1992) with its default parameters of the WEKA (Hall et al., 2009) workbench. The following 24 features were selected as most contributing with their descriptions in parenthesis, and sorted from most to least contributing:

1. A Feast for Crows (character's appearance in the book)
2. House (house to which the character belongs)
3. Culture (social group to which a character belongs.
4. A Dance with Dragons (character's appearance in the book)
5. Is noble (represents nobility of the character based on Title)
6. Gender (male or female)
7. Title (social status or nobility)
8. Age (time-reference: 305 AC. Characters born more than 100 years ago, which have not died yet have age 100)
9. A Storm of Swords (character's appearance in the book)
10. Is married (represents whether the character is married)
11. Is spouse alive (represents whether the spouse of the character is alive)
12. A Clash of Kings (character's appearance in the book)
13. Related to dead (represents whether a character is related to another dead character)
14. A Game of Thrones (character's appearance in the book)
15. Popularity score (the popularity score obtained based on the incoming and outgoing links to the characters webpage in the http://awoiaf.westeros.org wiki)
16. Is father alive (represents whether the father of the character is alive
17. Major/minor character (characters with a normalized popularity score >0.34 are considered as major characters).
18. Is mother alive (represents whether the mother of the character is alive)
19. Is heir alive (represents whether the heir of the character is alive)
20. Number dead relations (number of dead characters to whom a character is related)
21. Spouse (name of character’s spouse)
22. Father (name of character’s father)
23. Mother (name of character’s mother)
24. Heir (name of character’s heir)

### Method description

We used John Platt's sequential minimal optimization algorithm (Platt, 1999) for training a [Support Vector Machine](https://en.wikipedia.org/wiki/Support_vector_machine) (Cortes and Vapnik, 1995) with the [polynomial kernel](https://en.wikipedia.org/wiki/Polynomial_kernel), which is provided in WEKA (Hall et al., 2009). To train and test our model, we split our data set into 10 equally-sized subsets. We trained our model on 9 subsets and tested on the remaining one. We rotated our subsets such that each subset was used for testing exactly once. This procedure is called a 10-fold [cross-validation](https://en.wikipedia.org/wiki/Cross-validation_%28statistics%29).

### Method performance

We measured accuracy/precision (Eqn. 1) and coverage/recall (Eqn. 2) of our prediction method using ratios of TP (true positives, i.e. correctly predicted dead characters), FP (false positives, i.e. alive characters predicted to be dead), FN (false negatives, i.e. dead characters predicted to be alive), and TN (true negatives, i.e. correctly predicted alive characters).
                                            Precision = TP/(TP+ FP)        (Eqn. 1)
                                            Recall      = TP/(TP+ FN)        (Eqn. 2)
We combined these two measures into a single F-measure value:
                                           F-measure=  Precision*Recall/(100(Precision+Recall)) (Eqn. 3)


The prediction results of our model were:

Label Number of characters Precision Recall F-measure
Alive  1451                            85%        78%   0.82
Dead  495                             49%        60%   0.54

### References

Kira, K. and Rendell, L.A., 1992, July. A practical approach to feature selection. In _Proceedings of the ninth international workshop on Machine learning_ (pp. 249-256).

Hall, M., Frank, E., Holmes, G., Pfahringer, B., Reutemann, P. and Witten, I.H., 2009. The WEKA data mining software: an update. _ACM SIGKDD explorations newsletter, 11_(1), pp.10-18.

Platt, John C. "12 fast training of support vector machines using sequential minimal optimization." _Advances in kernel methods_ (1999): 185-208.

Cortes, C. and Vapnik, V., 1995. Support-vector networks. _Machine learning, 20_(3), pp.273-297.

&nbsp;

&nbsp;


## Why two algorithms?

The [got.show](got.show) project is a result of the [JavaScript Technology seminar](https://rostlab.org/owiki/index.php/Javascript_technology_2016) that took place in spring 2016 at the [RostLab ](https://rostlab.org/)at [Technical University of Munich](http://www.in.tum.de/). Within this seminar, we were two groups of students developing two different algorithms for the same prediction task - which character is likely to die next?

Both our groups used different features to describe the data and different machine learning algorithms for the predictions. While the SMV-based algorithm - described here - performed better at predicting dead characters, it is still interesting to look at the result of the Naive Bayes-based algorithm, described below.

### Feature selection

The steps of data extraction from the _Ice and Fire_ [wiki](http://awoiaf.westeros.org) and of feature selection were performed as described here. However, the feature set of our second group was slightly different and the following features were selected as the most contributing ones for the distinction between dead and alive characters (the descriptions of features are in parentheses and the sorting is from most to least contributing):

1. House (house to which the character belongs)
2. Culture (social group to which a character belongs.
3. Gender (male or female)
4. Title (social status or nobility)
5. Age (time-reference: 305 AC. Characters born more than 100 years ago, which have not died yet have age 100)
6. Has house 
7. Has spouse (indicates whether a character is married)
8. Age group
9. Is spouse alive (indicates whether the spouse is alive)
10. Links
11. Connections
12. House founded
13. Has heir (indicates whether a character has a heir)
14. Score
15. Has title
16. Multiple books 
17. Has heir alive (indicates whether the heir of a character is still alive)
18. Is noble
19. Status

### Method description

We used the implementation of the [Naive Bayes](https://en.wikipedia.org/wiki/Naive_Bayes_classifier) classifier (John and Langley, 1995) with its default parameters, which is provided in the WEKA workbench (Hall et al., 2009). Similar to the procedure of the first classifier - described here - we split our data set into 10 equally-sized subsets. We trained our model on 9 subsets and tested on the remaining one. We rotated our subsets such that each subset was used for testing exactly once. 

### Method performance

We measured the performance of our method as described here and the prediction results were:

Label Number of characters Precision Recall F-measure
Alive 1473 80% 88% 0.84
Dead 466 43% 29% 0.34

### References

John, G.H. and Langley, P., 1995, August. Estimating continuous distributions in Bayesian classifiers. In _Proceedings of the Eleventh conference on Uncertainty in artificial intelligence_ (pp. 338-345). Morgan Kaufmann Publishers Inc.

Hall, M., Frank, E., Holmes, G., Pfahringer, B., Reutemann, P. and Witten, I.H., 2009. The WEKA data mining software: an update. _ACM SIGKDD explorations newsletter, 11_(1), pp.10-18.
