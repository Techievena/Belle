﻿using System;
using System.Collections.Generic;
using System.Linq;
using Umbraco.Core.ObjectResolution;

namespace Umbraco.Belle.System.PropertyEditors
{
    /// <summary>
    /// A resolver to resolve all registered validators
    /// </summary>
    internal class ValidatorsResolver : LazyManyObjectsResolverBase<ValidatorsResolver, ValueValidator>
    {        
        public ValidatorsResolver(IEnumerable<Lazy<Type>> lazyTypeList)
            : base(lazyTypeList, ObjectLifetimeScope.Application)
        {
        }

        /// <summary>
        /// Returns the validators
        /// </summary>
        public IEnumerable<ValueValidator> Validators
        {
            get { return Values; }
        }

        /// <summary>
        /// Gets a validator by name
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        public ValueValidator GetValidator(string name)
        {
            return Values.FirstOrDefault(x => x.TypeName == name);
        } 
    }
}