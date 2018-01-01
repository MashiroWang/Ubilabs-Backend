var keystone = require('keystone');
const Answer = keystone.list('Answer')

exports = module.exports = function (req, res) {
	const { body } = req
	console.log(body)

	const onSuccess = () => {
		console.log('success')
		return res.apiResponse({
			success: true
		})
	}

	const onFail = (err) => {
		console.log()
		return res.apiResponse({
			success: false,
			message: err
		})
	}

	Answer.model.findOne({ _id: body._id }).exec((err, answer) => {
		if (!err) {
			answer.content.md = body.content.md
			answer.save((err, answer) => {
				if (err) {
					onFail(err)
				} else {
					onSuccess()
				}
			})
		} else {
			onFail(err)
		}
	})
}	
